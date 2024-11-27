import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import StackNavigator from './StackNavigator';
import {useDeviceTheme} from '@app/hooks';

const Navigator = () => {
  // Apply global theme (dark or light)
  const appTheme = useDeviceTheme();
  const theme = appTheme == 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
    >
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;