import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {isReadyRef, navigationRef} from './navigation-service';
import StackNavigator from './StackNavigator';
import {useAppThemeContext} from '@app/theme/provider';

const Navigator = () => {
  const {currentTheme} = useAppThemeContext();
  const theme =
    currentTheme.themeType === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

  // Cleanup effect to reset `isReadyRef` on unmount
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false; // Reset the readiness flag on unmount
    };
  }, []); // Empty dependency array ensures it runs once when component unmounts

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={() => {
        isReadyRef.current = true; // Set `isReadyRef.current` to true when navigation is ready
      }}
    >
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
