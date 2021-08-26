import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export const getFilteredTransactions = async (month, year) => {
  try {
    const data = await axios.get(
      `/transactions/filter?year:${year}&month:${month}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
