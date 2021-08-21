import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { authReducer } from './auth';
import { currencyReducer } from './currency';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];
const authPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};
const currencyPersistConfig = {
  key: 'dateGetCurrency',
  storage,
  whitelist: ['dateGetCurrency'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  currency: persistReducer(currencyPersistConfig, currencyReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});
const persistor = persistStore(store);

export { store, persistor };
