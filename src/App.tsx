import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ErrorBoundary} from '@app/components';
import {Text} from 'react-native';
import {SplashScreen} from './views';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {persistor, store} from './store/redux';
import {PersistGate} from 'redux-persist/integration/react';
import MultipleContextProvider from './store/context';
import {AppThemeWrapper} from './theme';
const App = () => {
  return (
    <ErrorBoundary catchErrors='always'>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* wrap context provider */}
        <MultipleContextProvider>
          {/* wrap redux store provider */}
          <ReduxStoreProvider store={store} >
            {/* wrap persist gate provider */}
            <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
              {/* wrap app container */}
              <AppContainer />
            </PersistGate>
          </ReduxStoreProvider>
        </MultipleContextProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};


/**
 * AppContainer is a component that wraps the main application
 * component with the theme provider.
 *
 * It provides the theme context to the main application
 * component and renders the main application component.
 */
const AppContainer = () => {
  return (
    <AppThemeWrapper>
      <SplashScreen />
    </AppThemeWrapper>
  );
};

export default App;