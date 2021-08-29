import axios from 'axios';
import BASE_URL from '../utils/environments';

export const getFilteredTransactions = async (month, year, token) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/transactions/filter?year=${year}&month=${month}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransactions = async token => {
  try {
    return await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async token => {
  const { data } = await axios.get(`${BASE_URL}/transactions/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const addNewTransaction = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/transactions`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
