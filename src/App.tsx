import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ErrorBoundary} from '@app/components';
import {useAppLangauage} from './i18n';
import {darkTheme, lightTheme} from './theme';
import GlobalIndicator from './components/modal/GlobalIndicator';
import {Text, View} from 'react-native';

const App = () => {
  return (
    <ErrorBoundary catchErrors='always'>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* Will wrap redux store provider */}
        < >
          {/* Will wrap persist gate provider */}
          <>
            <AppContainer />
          </>
        </>
      </GestureHandlerRootView>
    </ErrorBoundary>

  );
};


const AppContainer = () => {
  //! initialize and Apply current locale on app start
  useAppLangauage();
  // Get App Mode from settings
  const appTheme = 'dark';
  // Apply global theme (dark or light)
  const theme = appTheme == 'dark' ? darkTheme : lightTheme;
  return (
    <>
      <PaperProvider theme={theme}>
        {/* This will start screen of app -> SplashScreen */}
        <View>

          <Text> Welocme to react native</Text>
        </View>
        <>
          {/* Inside this tag can put all global modals */}
          <GlobalIndicator />
        </>
      </PaperProvider>
    </>

  );
};

export default App;