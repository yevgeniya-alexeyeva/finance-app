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
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesError,
} from './transactions-actions';

const initialFilterData = { filteredCosts: [], income: 0, totalCost: 0 };

const filter = createReducer(initialFilterData, {
  [filterTrSuccess]: (_, { payload }) => payload.data,
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
  [fetchCategoriesRequest]: () => true,
  [fetchCategoriesSuccess]: () => false,
  [fetchCategoriesError]: () => false,
});

const error = createReducer([], {
  [filterTrError]: (_, { payload }) => payload,
  [fetchTrError]: (_, { payload }) => payload,
  [filterTrSuccess]: () => null,
  [fetchTrSuccess]: () => null,
});

const transactionList = createReducer([], {
  [fetchTrSuccess]: (_, { payload }) => payload.data,
  [addTransactionError]: (_, { payload }) => payload.data,
  [addTransactionSuccess]: (state, { payload }) => [...state, payload.data],
});

const categories = createReducer([], {
  [fetchCategoriesSuccess]: (_, { payload }) => payload.categorylist,
});

const transactionsReducer = combineReducers({
  filter,
  loader,
  error,
  transactionList,
  categories,
});

export default transactionsReducer;
