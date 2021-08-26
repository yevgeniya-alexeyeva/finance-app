import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export const getFilteredTransactions = (month, year) => {
  return axios
    .get(`/transactions/filter?year:${year}&month:${month}`)
    .then(response => response.data);
};
