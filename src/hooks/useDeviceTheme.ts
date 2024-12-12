import {useState, useEffect} from 'react';
import {Appearance} from 'react-native';

/**
 * Hook to get the current color scheme (theme) of the device.
 * Also listens for theme change events and updates the state accordingly.
 * @returns The current color scheme (theme) of the device.
 */
const useDeviceTheme = () => {
  // State to store the current color scheme (theme)
  const [theme, setTheme] = useState<IThemeType>(Appearance.getColorScheme());

  useEffect(() => {
    // Listener for theme change events
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });

    // Clean up the listener when the component unmounts
    return () => {
      listener.remove();
    };
  }, []);

  return theme;
};

export default useDeviceTheme;