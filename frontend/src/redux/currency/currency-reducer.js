import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchCurrencyRequest,
  fetchCurrencySuccess,
  fetchCurrencyError,
} from './currency-actions';

const courseReducer = createReducer([], {
  [fetchCurrencySuccess]: (state, { payload }) => payload,
});

const dateGetReducer = createReducer([], {
  [fetchCurrencySuccess]: (state, { payload }) => payload.dateGet,
});

const loadingReducer = createReducer(false, {
  [fetchCurrencyRequest]: () => true,
  [fetchCurrencySuccess]: () => false,
  [fetchCurrencyError]: () => false,
});

const currencyReducer = combineReducers({
  course: courseReducer,
  loading: loadingReducer,
  dateGet: dateGetReducer,
});

export default currencyReducer;
