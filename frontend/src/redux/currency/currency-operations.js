import axios from 'axios';
import {
  fetchCurrencyRequest,
  fetchCurrencySuccess,
  fetchCurrencyError,
} from './currency-actions';

const fetchCurrency = () => async dispatch => {
  dispatch(fetchCurrencyRequest());
  try {
    const { data } = await axios.get(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    );
    dispatch(fetchCurrencySuccess({ ...data, dateGet: Date.now() }));
  } catch (error) {
    dispatch(fetchCurrencyError(error));
  }
};

// eslint-disable-next-line
export default { fetchCurrency };
