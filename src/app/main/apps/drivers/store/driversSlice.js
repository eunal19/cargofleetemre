import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import { getUserData } from './userSlice';

export const getDrivers = createAsyncThunk('drivers-list-app/drivers/getDrivers', async (routeParams, { getState }) => {
  routeParams = routeParams || getState().driversApp.drivers.routeParams;
  const response = await axios.get('https://mysite-h17z.onrender.com/team1/api/drivers', {
    params: routeParams
  });
  const data = await response.data.data;
  return { data, routeParams };
});

export const addDriver = createAsyncThunk('driversApp/drivers/addDriver', async (driver, { dispatch, getState }) => {
  const response = await axios.post(`https://mysite-h17z.onrender.com/team1/api/drivers`, driver);
  const data = await response.data;

  dispatch(getDrivers());

  return data;
});

export const updateDriver = createAsyncThunk(
  'driversApp/drivers/updateDriver',
  async (driver, { dispatch, getState }) => {
    const response = await axios.put(`https://mysite-h17z.onrender.com/team1/api/drivers/${driver.id}`, driver);
    const data = await response.data;

    dispatch(getDrivers());

    return data;
  }
);

export const removeDriver = createAsyncThunk(
  'driversApp/drivers/removeDriver',
  async (driverId, { dispatch, getState }) => {
    await axios.delete(`https://mysite-h17z.onrender.com/team1/api/drivers/${driverId}`);

    return driverId;
  }
);

// export const toggleStarredDriver = createAsyncThunk(
//   'driversApp/drivers/toggleStarredDriver',
//   async (driverId, { dispatch, getState }) => {
//     const response = await axios.post('/api/drivers-app/toggle-starred-driver', { driverId });
//     const data = await response.data;

//     dispatch(getUserData());

//     dispatch(getDrivers());

//     return data;
//   }
// );

// export const toggleStarredDrivers = createAsyncThunk(
//   'driversApp/drivers/toggleStarredDrivers',
//   async (driverIds, { dispatch, getState }) => {
//     const response = await axios.post('/api/drivers-app/toggle-starred-drivers', { driverIds });
//     const data = await response.data;

//     dispatch(getUserData());

//     dispatch(getDrivers());

//     return data;
//   }
// );

// export const setDriversStarred = createAsyncThunk(
//   'driversApp/drivers/setDriversStarred',
//   async (driverIds, { dispatch, getState }) => {
//     const response = await axios.post('/api/drivers-app/set-drivers-starred', { driverIds });
//     const data = await response.data;

//     dispatch(getUserData());

//     dispatch(getDrivers());

//     return data;
//   }
// );

// export const setDriversUnstarred = createAsyncThunk(
//   'driversApp/drivers/setDriversUnstarred',
//   async (driverIds, { dispatch, getState }) => {
//     const response = await axios.post('/api/drivers-app/set-drivers-unstarred', { driverIds });
//     const data = await response.data;

//     dispatch(getUserData());

//     dispatch(getDrivers());

//     return data;
//   }
// );

const driversAdapter = createEntityAdapter({});

export const { selectAll: selectDrivers, selectById: selectDriversById } = driversAdapter.getSelectors(
  state => state.driversApp.drivers
);

const driversSlice = createSlice({
  name: 'driversApp/drivers',
  initialState: driversAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    driverDialog: {
      type: 'new',
      props: {
        open: false
      },
      data: null
    }
  }),
  reducers: {
    setDriversSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: event => ({ payload: event.target.value || '' })
    },
    openNewDriverDialog: (state, action) => {
      state.driverDialog = {
        type: 'new',
        props: {
          open: true
        },
        data: null
      };
    },
    closeNewDriverDialog: (state, action) => {
      state.driverDialog = {
        type: 'new',
        props: {
          open: false
        },
        data: null
      };
    },
    openEditDriverDialog: (state, action) => {
      state.driverDialog = {
        type: 'edit',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeEditDriverDialog: (state, action) => {
      state.driverDialog = {
        type: 'edit',
        props: {
          open: false
        },
        data: null
      };
    }
  },
  extraReducers: {
    [updateDriver.fulfilled]: driversAdapter.upsertOne,
    [addDriver.fulfilled]: driversAdapter.addOne,
    // [removeDrivers.fulfilled]: (state, action) => driversAdapter.removeMany(state, action.payload),
    [removeDriver.fulfilled]: (state, action) => driversAdapter.removeOne(state, action.payload),
    [getDrivers.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      driversAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    }
  }
});

export const {
  setDriversSearchText,
  openNewDriverDialog,
  closeNewDriverDialog,
  openEditDriverDialog,
  closeEditDriverDialog
} = driversSlice.actions;

export default driversSlice.reducer;
