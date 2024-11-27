import {useState, useEffect} from 'react';
import {Appearance} from 'react-native';

const useDeviceTheme = () => {
  // State to store the current color scheme (theme)
  const [theme, setTheme] = useState(Appearance.getColorScheme());

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