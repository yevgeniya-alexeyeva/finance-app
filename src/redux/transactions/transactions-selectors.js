const getFilteredTransactions = state => state.transactions.filter;

const getIsLoading = state => state.transactions.loader;

const getErrorMessage = state => state.transactions.error;

const getCategories = state => state.transactions.categories;

// eslint-disable-next-line
export default {
  getFilteredTransactions,
  getIsLoading,
  getErrorMessage,
  getCategories,
};
