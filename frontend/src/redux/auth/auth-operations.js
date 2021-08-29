import axios from 'axios';
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth-actions';
import BASE_URL from '../../utils/environments';

const register = credentials => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, credentials);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

const logIn = credentials => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

const logOut = () => async dispatch => {
  dispatch(logoutRequest());
  try {
    await axios.post(`${BASE_URL}/users/logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

const getCurrentUser = token => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }
  dispatch(getCurrentUserRequest());
  try {
    const response = await axios.get(`${BASE_URL}/users/current`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};
// eslint-disable-next-line
export default { register, logIn, logOut, getCurrentUser };
