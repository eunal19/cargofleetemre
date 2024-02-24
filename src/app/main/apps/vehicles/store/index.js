import { combineReducers } from '@reduxjs/toolkit';
import contacts from './vehiclesSlice';
import user from './userSlice';

const reducer = combineReducers({
  contacts,
  user
});

export default reducer;
