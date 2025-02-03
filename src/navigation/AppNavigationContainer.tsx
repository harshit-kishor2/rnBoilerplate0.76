import {useAppThemeContext} from '@app/theme/provider';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import React from 'react';
import {navigationRef} from './navigation-service';
import {MainStackNavigator} from './stack';

/**
 * AppNavigation component responsible for managing the navigation container.
 * It uses the current theme from the theme context to determine the navigation theme.
 *
 * The component returns a NavigationContainer wrapping the StackNavigator.
 * The navigation container reference is passed to allow for top-level navigation actions.
 *
 * The theme is memoized based on the current theme type ('dark' or 'light') to optimize performance.
 */

const AppNavigationContainer: React.FC = () => {
  const {currentTheme} = useAppThemeContext();
  // Memoize theme selection to prevent unnecessary recalculations
  const theme = React.useMemo(
    () =>
      currentTheme.themeType === 'dark'
        ? NavigationDarkTheme
        : NavigationDefaultTheme,
    [currentTheme.themeType] // Only recalculate when themeType changes
  );

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default React.memo(AppNavigationContainer);
