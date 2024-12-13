import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import StackNavigator from './StackNavigator';
import {useAppThemeContext} from '@app/theme/AppThemeProvider';

const Navigator = () => {

  const {currentTheme} = useAppThemeContext();
  const theme = currentTheme.themeType === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

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