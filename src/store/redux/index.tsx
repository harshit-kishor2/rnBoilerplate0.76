import React from "react";
import {Text} from "react-native";
import {Provider as ReduxStoreProvider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, reduxStore} from "./redux-store";

const PersistedReduxProvider = ({children}: React.PropsWithChildren) => {
  return (
    <ReduxStoreProvider store={reduxStore}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxStoreProvider>
  );
};

export default PersistedReduxProvider;
