import {combineReducers} from '@reduxjs/toolkit';
import {demoReducer} from './slices';


//! Combine all reducers and export
export const allCombineReducers = combineReducers({
  demoReducer,
});