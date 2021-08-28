import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export const getFilteredTransactions = async (month, year) => {
  try {
    const { data } = await axios.get(
      `/transactions/filter?year=${year}&month=${month}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransactions = async () => {
  try {
    return await axios.get('/transactions');
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async () => {
  const { data } = await axios.get('/transactions/categories');
  return data;
};

export const addNewTransaction = async data => {
  const response = await axios.post('/transactions', data);
  return response;
};
