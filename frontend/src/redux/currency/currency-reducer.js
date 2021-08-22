import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchCurrencyRequest,
  fetchCurrencySuccess,
  fetchCurrencyError,
} from './currency-actions';

const courseReducer = createReducer([], {
  [fetchCurrencySuccess]: (state, { payload }) => payload.course,
});

const currentCourseReducer = createReducer([], {
  [fetchCurrencySuccess]: (state, { payload }) => payload,
});

const loadingReducer = createReducer(false, {
  [fetchCurrencyRequest]: () => true,
  [fetchCurrencySuccess]: () => false,
  [fetchCurrencyError]: () => false,
});

const currencyReducer = combineReducers({
  course: courseReducer,
  loading: loadingReducer,
  currentCourse: currentCourseReducer,
});

export default currencyReducer;
