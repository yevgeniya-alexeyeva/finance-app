import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  filterTrRequest,
  filterTrSuccess,
  filterTrError,
} from './transactions-actions';

const initialFilterData = { filteredCosts: [], income: 0, totalCost: 0 };

const filter = createReducer(initialFilterData, {
  [filterTrSuccess]: (_, { payload }) => payload,
});

const loader = createReducer([], {
  [filterTrRequest]: () => true,
  [filterTrSuccess]: () => false,
  [filterTrError]: () => false,
});

const error = createReducer([], {
  [filterTrError]: (_, { payload }) => payload,
  [filterTrSuccess]: () => null,
});

const transactionsReducer = combineReducers({
  filter,
  loader,
  error,
});

export default transactionsReducer;
