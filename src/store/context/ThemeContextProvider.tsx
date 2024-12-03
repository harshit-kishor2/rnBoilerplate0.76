/* eslint-disable no-unused-vars */
import { useDeviceTheme } from '@app/hooks';
import storage, { storageKeys } from '@app/services/storage';
import {darkTheme, lightTheme} from '@app/theme';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';


/**
 * Interface representing the shape of the AppThemeContext.
 * Contains the current theme and a method to change the theme.
 */
interface AppThemeContextType {
  /**
   * The current theme of the application.
   */
  themeInApp: AppTheme;
  /**
   * Method to change the theme of the application.
   * @param newTheme - The new theme to set.
   */
  setThemeInApp: (newTheme: ThemeType) => void;
}

/**
 * Context to manage the application's theme.
 * Provides the current theme and a method to change the theme.
 * Initially set to undefined and should be used within ThemeContextProvider.
 */
export const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

/**
 * Hook to access the theme context.
 * This hook will throw an error if it is used outside of ThemeContextProvider.
 *
 * @returns The theme context object which contains the current theme and a method to change it.
 */
export const useAppThemeContext = (): AppThemeContextType => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error(
      'useAppThemeContext must be used within ThemeContextProvider. ' +
        'Make sure you have wrapped your app with ThemeContextProvider.',
    );
  }
  return context;
};

/**
 * ThemeContextProvider component provides theme management functionality.
 * It determines the theme based on device settings and saved preferences,
 * then provides the theme and a function to change it through context.
 *
 * @param children React components to render within the theme context.
 * @returns A React component that provides the theme context to its children.
 */
export const AppThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  // Get the current theme from the device settings
  const deviceTheme = useDeviceTheme();

  // State to store the current theme, defaults to 'light'
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    /**
     * Loads the saved theme preference from storage.
     * If 'auto', sets the theme to the device's theme.
     * If 'light' or 'dark', sets the theme accordingly.
     * Defaults to 'light' if no valid saved theme is found.
     */
    const loadSavedTheme = () => {
      const savedTheme = storage.getString(storageKeys.app_theme);
      if (savedTheme === 'auto') {
        setTheme(deviceTheme);
      } else if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      } else {
        setTheme('light');
      }
    };

    // Load the saved theme when the component mounts
    loadSavedTheme();
  }, [deviceTheme]);

  useEffect(() => {
    /**
     * Saves the current theme to storage whenever it changes.
     */
    if (theme) {
      storage.set(storageKeys.app_theme, theme);
    }
  }, [theme]);

  // Determine the theme to apply based on the current theme state
  const appliedTheme = theme === 'dark' ? darkTheme : lightTheme;

  // Memoize the context value to optimize performance
  const value = useMemo(
    () => ({
      themeInApp: appliedTheme,
      setThemeInApp: setTheme,
    }),
    [appliedTheme]
  );

  // Provide the theme context to children components
  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};
