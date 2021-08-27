import * as api from '../../services/transactions';

import {
  filterTrRequest,
  filterTrSuccess,
  filterTrError,
  fetchTrRequest,
  fetchTrSuccess,
  fetchTrError,
} from './transactions-actions';

export const getFilteredTrList =
  ({ month, year }) =>
  async dispatch => {
    dispatch(filterTrRequest());

    try {
      const data = await api.getFilteredTransactions(month, year);
      dispatch(filterTrSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(filterTrError(error));
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
