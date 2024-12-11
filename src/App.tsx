import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ErrorBoundary} from '@app/components';
import GlobalIndicator from './components/modal/GlobalIndicator';
import {Text, View} from 'react-native';
import {SplashScreen} from './views';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {persistor, store} from './store/redux';
import {PersistGate} from 'redux-persist/integration/react';
import MultipleContextProvider from './store/context';
import {useAppThemeContext} from './store/context/ThemeContextProvider';
const App = () => {
  return (
    <>
      <ErrorBoundary catchErrors='always'>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* Will wrap context provider */}
          <MultipleContextProvider>
            {/* Will wrap redux store provider */}
            <ReduxStoreProvider store={store} >
              {/* Will wrap persist gate provider */}
              <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
                <AppContainer />
              </PersistGate>
            </ReduxStoreProvider>
          </MultipleContextProvider>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </>
  );
};


const AppContainer = () => {
  const {currentTheme} = useAppThemeContext();
  return (
    <PaperProvider theme={currentTheme}>
      {/* This will start screen of app -> SplashScreen */}
      <SplashScreen />
      <View>
        {/* Inside this tag can put all global modals */}
        <GlobalIndicator />
        <View />
      </View>
    </PaperProvider>

  );
};

export default App;