import {CrashShield} from '@app/components';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CombinedContextProvider from '@app/store/context-providers';
import PersistedReduxProvider from '@app/store/redux';
import {AppThemeProvider} from '@app/theme';
import Navigator from '@app/navigation/Navigator';
import {AppLocalizationProvider} from '@app/i18n';

const App = () => {
  return (
    <CrashShield>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppLocalizationProvider>
          <CombinedContextProvider>
            <PersistedReduxProvider>
              <AppThemeProvider autoDetect>
                <Navigator />
              </AppThemeProvider>
            </PersistedReduxProvider>
          </CombinedContextProvider>
        </AppLocalizationProvider>
      </GestureHandlerRootView>
    </CrashShield>
  );
};

export default App;