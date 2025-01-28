import {useTheme} from 'react-native-paper';

export {AppThemeProvider, useAppThemeContext} from './provider';

export const useAppTheme = () => {
  const theme = useTheme<IAppTheme>();
  return theme;
};