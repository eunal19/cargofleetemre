import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('driversApp/user/getUserData', async () => {
  const response = await axios.get('/api/drivers-app/user');
  const data = await response.data;
  return data;
});

const userSlice = createSlice({
  name: 'driversApp/user',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getUserData.fulfilled]: (state, action) => action.payload
  }
});

export default userSlice.reducer;
