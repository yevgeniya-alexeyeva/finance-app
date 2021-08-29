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

const addTransaction = newTransaction => async dispatch => {
  dispatch(addTransactionRequest());
  try {
    const { data } = await api.addNewTransaction(newTransaction);
    dispatch(addTransactionSuccess(data));
  } catch (error) {
    dispatch(addTransactionError(error));
  }
};

const fetchTrList = () => async dispatch => {
  dispatch(fetchTrRequest());
  try {
    const { data } = await api.getAllTransactions();
    dispatch(fetchTrSuccess(data));
  } catch (error) {
    dispatch(fetchTrError());
  }
};

const fetchCategories = () => async dispatch => {
  dispatch(fetchCategoriesRequest());
  try {
    const { data } = await api.getCategories();
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
