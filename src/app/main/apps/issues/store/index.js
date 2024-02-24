import { combineReducers } from '@reduxjs/toolkit';
import contacts from './issuesSlice';
import user from './userSlice';

const reducer = combineReducers({
  contacts,
  user
});

export default reducer;
