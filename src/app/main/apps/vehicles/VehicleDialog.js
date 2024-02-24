import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';

import {
  removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog
} from './store/vehiclesSlice';

const defaultValues = {
  brand: '',
  model: '',
  manufacture_year: '',
  color: '',
  image_url: '',
  plate_number: '',
  engine_number: '',
  fuel_type: '',
  active: 'false'
};

const options = [
  { value: 'natural_gas', label: 'Natural gas' },
  { value: 'propane', label: 'Propane' },
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'diesel', label: 'Diesel' }
];

function IssueDialog(props) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

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
     * Dialog type: 'edit'
     */
    if (contactDialog.type === 'edit' && contactDialog.data) {
      reset({ ...contactDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...contactDialog.data,
        id: FuseUtils.generateGUID()
      });
    }
  }, [contactDialog.data, contactDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return contactDialog.type === 'edit' ? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog.type === 'new') {
      dispatch(addContact(data));
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
            {contactDialog.type === 'new' ? 'New IssueNaz' : 'Edit Contact'}
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
                <TextField {...field} className="mb-24" label="brand" id="brand" variant="outlined" fullWidth />
              )}
            />
          </div>
          <div className="flex">
            <Controller
              control={control}
              name="model"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Model" id="model" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="manufacture_year"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="manufacture_year"
                  label="Year of manufacturer"
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
              name="color"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Color" id="color" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Vehicle Image"
                  id="image_url"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="plate_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Plate Number"
                  id="plate_number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="engine_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Engine Number"
                  id="engine_number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="fuel_type"
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} required select variant="filled" fullWidth label="Fuel Type">
                  <MenuItem value="">Choose the Vehicle</MenuItem>
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit">
                Add
              </Button>
            </div>

            <Button onClick={() => closeComposeDialog()}>Cancel</Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              {/* <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}> */}
              <Button variant="contained" color="secondary" type="submit">
                Update
              </Button>
            </div>
            <Button onClick={() => closeComposeDialog()}>Cancel</Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default IssueDialog;
