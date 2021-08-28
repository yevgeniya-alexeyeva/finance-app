import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  registerSuccess,
  registerError,
  loginSuccess,
  loginError,
  logoutSuccess,
  logoutError,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth-actions';

const initialUserState = {
  name: null,
  email: null,
};
const userReducer = createReducer(initialUserState, {
  [registerSuccess]: (_, { payload }) => payload.data,
  [loginSuccess]: (_, { payload }) => payload.data,
  [logoutSuccess]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload: { data } }) => data,
});

const tokenReducer = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.data.token,
  [logoutSuccess]: () => null,
});

const errorReducer = createReducer(null, {
  [registerSuccess]: (_, { payload }) => null,
  [loginSuccess]: (_, { payload }) => null,
  [registerError]: (_, { payload }) => payload,
  [loginError]: (_, { payload }) => payload,
  [logoutError]: (_, { payload }) => payload,
  [getCurrentUserError]: (_, { payload }) => payload,
});

const isAuthenticatedReducer = createReducer(false, {
  [registerSuccess]: () => true,
  [loginSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [registerError]: () => false,
  [loginError]: () => false,
  [getCurrentUserError]: () => false,
  [logoutSuccess]: () => false,
});
const authReducer = combineReducers({
  user: userReducer,
  isAuthenticated: isAuthenticatedReducer,
  token: tokenReducer,
  error: errorReducer,
});

export default authReducer;
