import React from 'react';
import {Text} from 'react-native';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store, useAppDispatch, useAppSelector} from './utils';

const PersistedReduxProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ReduxStoreProvider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxStoreProvider>
  )
}

export default PersistedReduxProvider


export {
  store,
  persistor,
  useAppDispatch,
  useAppSelector
}