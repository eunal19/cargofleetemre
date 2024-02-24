// import FuseUtils from '@fuse/utils/FuseUtils';
// import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
// import * as yup from 'yup';

import {
  removeDriver,
  updateDriver,
  addDriver,
  closeNewDriverDialog,
  closeEditDriverDialog
} from './store/driversSlice';

/**
 * Form Validation Schema
 */
/* const schema = yup.object().shape({
  name: yup.string().required('You must enter a name')
}); */

function DriverDialog(props) {
  const dispatch = useDispatch();
  const driverDialog = useSelector(({ driversApp }) => driversApp.drivers.driverDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange'
    // resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const firstName = watch('first_name');
  const avatar = watch('avatar');
  const lastName = watch('last_name');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (driverDialog.type === 'edit' && driverDialog.data) {
      reset({ ...driverDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (driverDialog.type === 'new') {
      reset({
        ...driverDialog.data
        // id: FuseUtils.generateGUID()
      });
    }
  }, [driverDialog.data, driverDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (driverDialog.props.open) {
      initDialog();
    }
  }, [driverDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return driverDialog.type === 'edit' ? dispatch(closeEditDriverDialog()) : dispatch(closeNewDriverDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (driverDialog.type === 'new') {
      dispatch(addDriver(data));
    } else {
      dispatch(updateDriver({ ...driverDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  /* function handleRemove() {
    dispatch(removeDriver(id));
    closeComposeDialog();
  } */

  return (
    <Dialog
      classes={{
        paper: 'm-24'
      }}
      {...driverDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {driverDialog.type === 'new' ? 'New Driver' : 'Edit Driver'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          {driverDialog.type === 'new' && <Avatar className="w-96 h-96" alt="driver avatar" src={avatar} />}
          {driverDialog.type === 'edit' && <EditIcon alt="edit icon" style={{ fontSize: 80 }} />}

          {driverDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {firstName} {lastName}
            </Typography>
          )}
        </div>
      </AppBar>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="first_name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="First name"
                  id="first_name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20" />

            <Controller
              control={control}
              name="last_name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Last name"
                  id="last_name"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div
            style={{
              display: 'flex'
            }}
          >
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">account_box</Icon>
              </div>

              <Controller
                control={control}
                name="license_number"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Driver license number"
                    id="license_number"
                    variant="outlined"
                    required
                    fullWidth
                    style={{ marginRight: '3em', width: '50em' }}
                  />
                )}
              />
              <Controller
                control={control}
                name="license_class"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Class"
                    id="license_class"
                    variant="outlined"
                    required
                    fullWidth
                    style={{ marginRight: '3em' }}
                  />
                )}
              />
              <Controller
                control={control}
                name="license_state"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="State"
                    id="license_state"
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </div>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">cake</Icon>
            </div>
            <Controller
              control={control}
              name="birth_date"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="birth_date"
                  label="Birth date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="address1"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Address"
                  id="address1"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="flex">
              <div className="min-w-48 pt-20" />
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="City"
                    id="city"
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20" />
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="State"
                    id="state"
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20" />
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Country"
                    id="country"
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20" />
              <Controller
                control={control}
                name="postal_code"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Postal code"
                    id="postal_code"
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </div>
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <Controller
              control={control}
              name="phone_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone number"
                  id="phone_number"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  id="email"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          {/* <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Notes"
                  id="notes"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                />
              )}
            />
          </div> */}
        </DialogContent>

        {driverDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                onClick={e => {
                  e.stopPropagation();
                  dispatch(closeNewDriverDialog());
                }}
              >
                Add
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(closeNewDriverDialog());
                }}
              >
                Close
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="primary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Save
              </Button>
              <Button variant="contained" color="primary" onClick={() => dispatch(closeEditDriverDialog())}>
                Close
              </Button>
            </div>
            <IconButton>
              <Icon
                onClick={e => {
                  e.stopPropagation();
                  dispatch(removeDriver(id));
                  closeComposeDialog();
                }}
              >
                delete
              </Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default DriverDialog;
