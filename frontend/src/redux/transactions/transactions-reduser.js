import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  filterTrRequest,
  filterTrSuccess,
  filterTrError,
  fetchTrRequest,
  fetchTrSuccess,
  fetchTrError,
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
  [fetchTrRequest]: () => true,
  [fetchTrSuccess]: () => false,
  [fetchTrError]: () => false,
  [addTransactionRequest]: () => true,
  [addTransactionSuccess]: () => false,
  [addTransactionError]: () => false,
});

const error = createReducer([], {
  [filterTrError]: (_, { payload }) => payload,
  [fetchTrError]: (_, { payload }) => payload,
  [filterTrSuccess]: () => null,
  [fetchTrSuccess]: () => null,
  [addTransactionError]: (_, { payload }) => payload,
  [addTransactionSuccess]: () => null,
});

const transactionList = createReducer([], {
  [fetchTrSuccess]: (_, { payload }) => payload.data,
  [addTransactionSuccess]: (state, { payload }) => [payload, ...state],
});

const transactionsReducer = combineReducers({
  filter,
  loader,
  error,
  transactionList,
});

export default transactionsReducer;
