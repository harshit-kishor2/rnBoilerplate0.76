import {configureStore} from '@reduxjs/toolkit';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
  persistReducer,
  persistStore,
} from 'redux-persist';

import {allCombineReducers} from './combine-reducers';
import storage from '@app/services/storage';

// ======================================================


//  Common middlewares
export const middlewares = [
  // logger
];

// ======================================================
// For redux persist with react-native-mmkv
export const reduxStorage: Storage = {
  /**
   * Stores a value in storage.
   * @param {string} key The key to store the value under.
   * @param {any} value The value to store.
   * @return {Promise<boolean>} A Promise that resolves to true if the value was stored successfully.
   */
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },

  /**
   * Retrieves the value associated with the specified key from storage.
   * @param {string} key The key to retrieve the value for.
   * @return {Promise<any>} A Promise that resolves to the value associated with the key.
   */
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },

  /**
   * Removes the item associated with the specified key from storage.
   *
   * @param {string} key The key of the item to be removed.
   * @return {Promise<void>} A Promise that resolves once the item is successfully removed.
   */
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

/**
 * Persist configuration
 * key: The key to store the state in storage
 * storage: The storage object used to persist the state
 * version: The version of the state to persist
 * blacklist: An array of reducer keys to exclude from persistence
 */
const persistConfig = {
  key: 'root_redux_states',
  storage: reduxStorage,
  version: 1,
  blacklist: [''],
};

// all reducers are persisted here
const persistedReducer = persistReducer(persistConfig, allCombineReducers);

export const store = configureStore({
  reducer: persistedReducer,
  /**
   * Configures the middleware for the store.
   * @param {Function} getDefaultMiddleware A function that returns the default middleware.
   * @return {Array<Middleware>} An array of middleware.
   *
   * The `serializableCheck` options are used to ignore certain actions and state paths
   * from the serializability check. These are used to ignore actions and state that are
   * not serializable, such as functions, promises, and other non-serializable values.
   * The `immutableCheck` option is set to false to disable the immutable check, which
   * is not needed in this case because the state is already immutable.
   * `ignoreActionPaths` and `ignorePaths` are used to ignore actions and state paths
   *
   * The middleware array is concatenated with the `middlewares` array, which is an array
   * of middleware functions that are defined elsewhere in the codebase.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: [],
        ignoredPaths: [],
      },
    }).concat(middlewares),
});

// Persist the store
export const persistor = persistStore(store);

// Add the following function to reset the persisted state
export const purgePersistedState = () => {
  persistor.purge();
};
