import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export const getFilteredTransactions = (month, year) => {
  return axios
    .get(`/transactions/filter?${month}&${year}`)
    .then(response => response.data);
};

export const getCategories = async () => {
  const { data } = await axios.get('/transactions/categories');
  return data;
};

export const addNewTransaction = async data => {
  const response = await axios.post('/transactions', data);
  return response;
};
