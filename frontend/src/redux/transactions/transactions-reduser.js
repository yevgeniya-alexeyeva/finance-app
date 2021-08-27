import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  filterTrRequest,
  filterTrSuccess,
  filterTrError,
  addTransactionRequest,
  addTransactionSuccess,
  addTransactionError,
} from './transactions-actions';

const initialFilterData = { filteredCosts: [], income: 0, totalCost: 0 };

const filter = createReducer(initialFilterData, {
  [filterTrSuccess]: (_, { payload }) => payload,
});

const loader = createReducer([], {
  [filterTrRequest]: () => true,
  [filterTrSuccess]: () => false,
  [filterTrError]: () => false,
  [addTransactionRequest]: () => true,
  [addTransactionSuccess]: () => false,
  [addTransactionError]: () => false,
});

const error = createReducer([], {
  [filterTrError]: (_, { payload }) => payload,
  [filterTrSuccess]: () => null,
  [addTransactionError]: (_, { payload }) => payload,
  [addTransactionSuccess]: () => null,
});

const transactions = createReducer([], {
  [addTransactionSuccess]: (state, { payload }) => [payload, ...state],
});

const transactionsReducer = combineReducers({
  filter,
  loader,
  error,
  transactions,
});

export default transactionsReducer;
