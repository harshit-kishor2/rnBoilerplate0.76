import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {appThemeLocalStorage, appThemeLocalStorageKeys} from './utils';
import {darkTheme, lightTheme} from './themes';
import {PaperProvider} from 'react-native-paper';
import {Appearance} from 'react-native';

interface IAppThemeContext {
  currentTheme: IAppTheme;
  selectedThemeType: ISelectedTheme;
  setSelectedThemeType: (themeTypeProp: ISelectedTheme) => void;
}

interface IAppThemeProvider {
  autoDetect?: boolean;
  children: React.ReactNode;
}

export const AppThemeContext = createContext<IAppThemeContext | undefined>(undefined);

export const useAppThemeContext = (): IAppThemeContext => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error(
      'useAppThemeContext must be used within AppThemeProvider. ' +
      'Make sure you have wrapped your app with AppThemeProvider.',
    );
  }
  return context;
};

export const AppThemeProvider = ({
  autoDetect = true,
  children,
}: IAppThemeProvider) => {

  const [deviceTheme, setDeviceTheme] = useState<ISelectedTheme>('light');

  const [selectedThemeType, setSelectedThemeType] = useState<ISelectedTheme>('auto');


  useEffect(() => {
    const updateDeviceTheme = () => {
      const systemTheme = Appearance.getColorScheme() ?? 'light';
      setDeviceTheme(systemTheme);
    };
    const listener = Appearance.addChangeListener(updateDeviceTheme);
    updateDeviceTheme(); // Initialize deviceTheme on mount
    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = appThemeLocalStorage.getString(
          appThemeLocalStorageKeys.app_theme_type,
        ) as ISelectedTheme;

        if (['auto', 'dark', 'light'].includes(savedTheme)) {
          setSelectedThemeType(savedTheme);
        } else {
          setSelectedThemeType('auto');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        setSelectedThemeType('auto');
      }
    };

    loadThemePreference();
  }, []);


  useEffect(() => {
    try {
      appThemeLocalStorage.set(appThemeLocalStorageKeys.app_theme_type, selectedThemeType);
    } catch (error) {
      console.error('Error saving theme to storage or updating theme:', error);
    }
  }, [selectedThemeType]);

  // Compute applied theme
  const appliedTheme = useMemo(() => {
    const isAutoDetected = selectedThemeType === 'auto' && autoDetect;
    const themeToApply = isAutoDetected ? deviceTheme : selectedThemeType;
    return themeToApply === 'dark' ? darkTheme : lightTheme;
  }, [selectedThemeType, deviceTheme, autoDetect]);

  const value = useMemo(
    () => ({
      currentTheme: appliedTheme,
      setSelectedThemeType,
      selectedThemeType,
    }),
    [appliedTheme, selectedThemeType]
  );

  return (
    <AppThemeContext.Provider value={value}>
      <PaperProvider theme={appliedTheme}>
        {children}
      </PaperProvider>
    </AppThemeContext.Provider>
  );
};