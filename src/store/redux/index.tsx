import React from 'react';
import {Text} from 'react-native';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './utils';

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