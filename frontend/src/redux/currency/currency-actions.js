import { createAction } from '@reduxjs/toolkit';

export const fetchCurrencyRequest = createAction(
  'currency/fetchCurrencyRequest',
);
export const fetchCurrencySuccess = createAction(
  'currency/fetchCurrencySuccess',
);
export const fetchCurrencyError = createAction('currency/fetchCurrencyError');
