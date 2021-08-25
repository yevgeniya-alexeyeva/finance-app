import { createAction } from '@reduxjs/toolkit';

export const filterTrRequest = createAction('transactions/filterTrRequest');
export const filterTrSuccess = createAction('transactions/filterTrSuccess');
export const filterTrError = createAction('transactions/filterTrError');
