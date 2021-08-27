import * as api from '../../services/transactions';

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

export const fetchTrList = () => async dispatch => {
  dispatch(fetchTrRequest());
  try {
    const data = await api.getAllTransactions();
    dispatch(fetchTrSuccess(data));
  } catch (error) {
    dispatch(fetchTrError());
  }
};
