import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ErrorBoundary} from '@app/components';
import {useAppLangauage} from './i18n';
import {darkTheme, lightTheme} from './theme';
import GlobalIndicator from './components/modal/GlobalIndicator';
import {Text, View} from 'react-native';
import {SplashScreen} from './views';
import {useDeviceTheme} from './hooks';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {persistor, store} from './store/redux';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <>
      <ErrorBoundary catchErrors='always'>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* Will wrap redux store provider */}
          <ReduxStoreProvider store={store} >
            {/* Will wrap persist gate provider */}
            <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
              <AppContainer />
            </PersistGate>
          </ReduxStoreProvider>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </>
  );
};


const AppContainer = () => {
  //! initialize and Apply current locale on app start
  useAppLangauage();
  // Get App Mode from settings
  const deviceTheme = useDeviceTheme();
  // Apply global theme (dark or light)
  const theme = deviceTheme == 'dark' ? darkTheme : lightTheme;
  return (
    <PaperProvider theme={theme}>
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