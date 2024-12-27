import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, Storage} from 'redux-persist';

import {demoReducer} from './slices/demo.slice';

// ======================================================
//! Combine all reducers and export
export const allCombineReducers = combineReducers({
  demoReducer,
});

export const reduxLocalStorage: MMKV = new MMKV({
  id: `redux-local-storage`,
  encryptionKey: 'reduxLocalStorageEncryptionKey'
});

export const reduxPersistStorage: Storage = {
  setItem: (key, value) => {
    reduxLocalStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = reduxLocalStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    reduxLocalStorage.delete(key);
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
  storage: reduxPersistStorage,
  version: 1,
  blacklist: [],
};

// all reducers are persisted here
const persistedReducer = persistReducer(persistConfig, allCombineReducers);


// Common middlewares
export const middlewares = [
  //! you can put your middlewares here like redux-logger
];


export const reduxStore = configureStore({
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
export const persistor = persistStore(reduxStore);

// Add the following function to reset the persisted state
export const purgePersistedState = () => {
  persistor.purge();
};
