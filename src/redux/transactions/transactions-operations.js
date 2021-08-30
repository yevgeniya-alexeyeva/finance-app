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
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesError,
} from './transactions-actions';

const getFilteredTrList =
  ({ month, year }, token) =>
  async dispatch => {
    dispatch(filterTrRequest());

    try {
      const transactions = await api.getFilteredTransactions(
        month,
        year,
        token,
      );
      dispatch(filterTrSuccess(transactions));
    } catch (error) {
      dispatch(filterTrError(error));
    }
  };

const addTransaction = (newTransaction, token) => async dispatch => {
  dispatch(addTransactionRequest());
  try {
    const { data } = await api.addNewTransaction(newTransaction, token);
    dispatch(addTransactionSuccess(data));
  } catch (error) {
    dispatch(addTransactionError(error));
  }
};

const fetchTrList = token => async dispatch => {
  dispatch(fetchTrRequest());
  try {
    const { data } = await api.getAllTransactions(token);
    dispatch(fetchTrSuccess(data));
  } catch (error) {
    dispatch(fetchTrError());
  }
};

const fetchCategories = token => async dispatch => {
  dispatch(fetchCategoriesRequest());
  try {
    const { data } = await api.getCategories(token);
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    dispatch(fetchCategoriesError());
  }
};
// eslint-disable-next-line
export default {
  getFilteredTrList,
  addTransaction,
  fetchTrList,
  fetchCategories,
};
