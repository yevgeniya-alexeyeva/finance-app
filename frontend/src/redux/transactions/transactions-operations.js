import * as api from '../../services/transactions';

import {
  filterTrRequest,
  filterTrSuccess,
  filterTrError,
  addTransactionRequest,
  addTransactionSuccess,
  addTransactionError,
} from './transactions-actions';

export const getFilteredTrList =
  ({ month, year }) =>
  async dispatch => {
    dispatch(filterTrRequest());

  try {
    const transactions = await api.getFilteredTransactions(month, year);
    dispatch(filterTrSuccess(transactions));
  } catch (error) {
    dispatch(filterTrError(error));
  }
};

export const addTransaction = newTransaction => async dispatch => {
  dispatch(addTransactionRequest());
  try {
    const { data } = await api.addNewTransaction(newTransaction);
    dispatch(addTransactionSuccess(data));
  } catch (error) {
    dispatch(addTransactionError(error));
  }
};
