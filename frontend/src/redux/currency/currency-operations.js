import axios from 'axios';
import {
  fetchCurrencyRequest,
  fetchCurrencySuccess,
  fetchCurrencyError,
} from './currency-actions';

const fetchCurrency = () => async (dispatch, getState) => {
  dispatch(fetchCurrencyRequest());
  try {
    const { currentCourse } = getState();
    dispatch(fetchCurrencySuccess(currentCourse));
    if (!currentCourse) {
      const { data } = await axios.get(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
      );
      const dateGet = Date.now();
      dispatch(
        fetchCurrencySuccess({ course: data, dateGetCurrency: dateGet }),
      );
    } else {
      dispatch(fetchCurrencySuccess(currentCourse));
    }
  } catch (error) {
    dispatch(fetchCurrencyError(error));
  }
};

// eslint-disable-next-line
export default { fetchCurrency };
