import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';

import { removeContact, updateContact, closeAssignContactDialog, assignContact } from './store/vehiclesSlice';

const defaultValues = {
  vehicle_id: '444',
  driver_id: '',
  start_date: '',
  start_odometer: '',
  start_comment: ''
};

function VehicleAssignDialog(props) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.assignDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'assign'
     */
    if (contactDialog.type === 'assign' && contactDialog.data) {
      reset({ ...contactDialog.data });
    }
  }, [contactDialog?.data, contactDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  // THIS IS FOR GETTING DRIVERS TO ASSIGN

  const [myDrivers, setMyDrivers] = useState([]);

  useEffect(() => {
    async function getMyDrivers() {
      const res = await fetch('https://mysite-h17z.onrender.com/team1/api/drivers');
      const data = await res.json();

      setMyDrivers(data.data);
    }

    getMyDrivers();
  }, []);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return contactDialog.type === 'assign' && dispatch(closeAssignContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog.type === 'assign') {
      dispatch(assignContact(data));
    } else {
      dispatch(updateContact({ ...contactDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24'
      }}
      {...contactDialog.props}
      // onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === 'assign' && 'Assign Driver'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          {contactDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
      </AppBar>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <Controller
              control={control}
              name="brand"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Vehicle"
                  id="brand"
                  disabled
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="driver_id"
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} required select variant="filled" fullWidth label="Driver">
                  <MenuItem value="">Choose the Driver</MenuItem>
                  {myDrivers.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                      {`${option.first_name} ${option.last_name}`}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
          <br />

          <div className="flex">
            <Controller
              control={control}
              name="start_date"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="start_date"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="start_odometer"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Starting Odometer"
                  id="start_odometer"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="start_comment"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Comments"
                  id="start_comment"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {contactDialog.type === 'assign' && (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </div>

            <Button onClick={() => closeComposeDialog()}>Reset</Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default VehicleAssignDialog;
