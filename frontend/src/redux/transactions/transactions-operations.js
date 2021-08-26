import * as api from '../../services/transactions';

import {
  filterTrRequest,
  filterTrSuccess,
  filterTrError,
} from './transactions-actions';

export const getFilteredTrList =
  ({ month, year }) =>
  async dispatch => {
    dispatch(filterTrRequest());

    try {
      const data = await api.getFilteredTransactions(month, year);
      dispatch(filterTrSuccess(data));
    } catch (error) {
      dispatch(filterTrError(error));
    }
  };
