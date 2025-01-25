import {CrashShield} from '@app/components';
import {AppLocalizationProvider} from '@app/i18n';
import Navigator from '@app/navigation/Navigator';
import CombinedContextProvider from '@app/store/context-providers';
import PersistedReduxProvider from '@app/store/redux';
import {AppThemeProvider} from '@app/theme';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <CrashShield>
      <SafeAreaProvider style={styles.container}>
        <GestureHandlerRootView style={styles.container}>
          <AppThemeProvider autoDetect>
            <AppLocalizationProvider defaultLanguage="en">
              <CombinedContextProvider>
                <PersistedReduxProvider>
                  <Navigator />
                </PersistedReduxProvider>
              </CombinedContextProvider>
            </AppLocalizationProvider>
          </AppThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </CrashShield>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});