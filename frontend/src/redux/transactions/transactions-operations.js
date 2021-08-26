import * as api from '../../services/transactions';

import {
  filterTrRequest,
  filterTrSuccess,
  filterTrError,
} from './transactions-actions';

export const getFilteredTrList = (month, year) => async dispatch => {
  dispatch(filterTrRequest());

  try {
    const transactions = await api.getFilteredTransactions(month, year);
    dispatch(filterTrSuccess(transactions));
  } catch (error) {
    dispatch(filterTrError(error));
  }
};
