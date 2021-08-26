export const getFilteredTransactions = state => state.transactions.filter;

export const getIsLoading = state => state.transactions.loader;

export const getErrorMessage = state => state.transactions.error;

// // eslint-disable-next-line
// export default {
//   getFilteredTransactions,
//   getIsLoading,
//   getErrorMessage,
// };
