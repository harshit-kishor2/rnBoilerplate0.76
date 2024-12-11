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
  currentTheme: IAppTheme;

  /**
   * The current theme type of the application.
   */
  selectedThemeType: IThemeType;

  /**
   * Method to change the theme of the application.
   * @param themeTypeProp - The new theme to set.
   */
  setSelectedThemeType: (themeTypeProp: IThemeType) => void;
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
  const [selectedThemeType, setSelectedThemeType] = useState<IThemeType>('light');

  useEffect(() => {
  /**
   * Function to load the saved theme from storage.
   * If a valid theme is found, sets the theme to it.
   * Defaults to 'light' if no valid saved theme is found.
   */
    const loadSavedTheme = () => {
      const savedTheme = storage.getString(storageKeys.app_theme)  as IThemeType;
      if (savedTheme) {
        setSelectedThemeType(savedTheme);
      } else {
        setSelectedThemeType('light');
      }
    };
    // Load the saved theme when the component mounts
    loadSavedTheme();
  }, [deviceTheme]);

  useEffect(() => {
    /**
     * Saves the current theme to storage whenever it changes.
     */
    if (selectedThemeType) {
      storage.set(storageKeys.app_theme, selectedThemeType);
    }
  }, [selectedThemeType]);


  // Determine the applied theme
  let appliedTheme;
  if (selectedThemeType === 'auto') {
    appliedTheme = deviceTheme === 'dark' ? darkTheme : lightTheme;
  } else if (selectedThemeType === 'dark') {
    appliedTheme = darkTheme;
  } else {
    appliedTheme = lightTheme;
  }

  // Memoize the context value to optimize performance
  const value = useMemo(
    () => ({
      currentTheme: appliedTheme,
      setSelectedThemeType,
      selectedThemeType,
    }),
    [appliedTheme,selectedThemeType]
  );

  // Provide the theme context to children components
  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};
