import axios from 'axios';

const createTransaction = async data => {
  const response = await axios.post(
    'http://localhost:3000/transactions/',
    data,
  );
  return response;
};

export default createTransaction;
