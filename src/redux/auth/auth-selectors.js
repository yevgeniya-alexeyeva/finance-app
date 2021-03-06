const getIsAuthenticated = state => state.auth.isAuthenticated;

const getUsersName = state => state.auth.user.name;

const getUserBalance = state => state.auth.user.balance;

const getErrorMessage = state => state.auth.error;

const getToken = state => state.auth.token;

// eslint-disable-next-line
export default {
  getIsAuthenticated,
  getUsersName,
  getErrorMessage,
  getUserBalance,
  getToken,
};
