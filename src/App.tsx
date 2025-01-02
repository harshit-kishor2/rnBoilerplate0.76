import {CrashShield} from '@app/components';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SplashScreen} from './views';
import {AppI18nProvider} from './i18n';
import CombinedContextProvider from './store/context-providers';
import PersistedReduxProvider from './store/redux';
import {AppThemeProvider} from './theme';

const App = () => {
  return (
    <CrashShield>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppI18nProvider>
          <CombinedContextProvider>
            <PersistedReduxProvider>
              <AppThemeProvider autoDetect>
                <SplashScreen />
              </AppThemeProvider>
            </PersistedReduxProvider>
          </CombinedContextProvider>
        </AppI18nProvider>
      </GestureHandlerRootView>
    </CrashShield>
  );
};

export default App;