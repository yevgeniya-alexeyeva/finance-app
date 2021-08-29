import { createAction } from '@reduxjs/toolkit';

export const filterTrRequest = createAction('transactions/filterTrRequest');
export const filterTrSuccess = createAction('transactions/filterTrSuccess');
export const filterTrError = createAction('transactions/filterTrError');

export const fetchTrRequest = createAction('transactions/fetchTrRequest');
export const fetchTrSuccess = createAction('transactions/fetchTrSuccess');
export const fetchTrError = createAction('transactions/fetchTrError');

export const addTransactionRequest = createAction(
  'transactions/addTransactionRequest',
);
export const addTransactionSuccess = createAction(
  'transactions/addTransactionSuccess',
);
export const addTransactionError = createAction(
  'transactions/addTransactionError',
);
export const fetchCategoriesRequest = createAction(
  'transactions/fetchCategoriesRequest',
);
export const fetchCategoriesSuccess = createAction(
  'transactions/fetchCategoriesSuccess',
);
export const fetchCategoriesError = createAction(
  'transactions/fetchCategoriesError',
);
