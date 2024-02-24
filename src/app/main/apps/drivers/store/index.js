import { combineReducers } from '@reduxjs/toolkit';
import drivers from './driversSlice';
import user from './userSlice';

const reducer = combineReducers({
  drivers,
  user
});

export default reducer;
