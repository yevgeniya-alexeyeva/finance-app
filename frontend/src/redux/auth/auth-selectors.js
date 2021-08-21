const getIsAuthenticated = state => state.auth.isAuthenticated;

const getUsersName = state => state.auth.user.name;

const getErrorMessage = state => state.auth.error;

// eslint-disable-next-line
export default { getIsAuthenticated, getUsersName, getErrorMessage };
