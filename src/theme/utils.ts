import { MMKV } from 'react-native-mmkv';
import {useTheme} from 'react-native-paper';

export const appThemeLocalStorageKeys = {
  app_theme_type: '@app_theme_type',
};

export const appThemeLocalStorage: MMKV = new MMKV({
  id: 'app-theme-local-storage',
  encryptionKey: 'secure-random-encryption-key',
});


export const useAppTheme = () => {
  const theme = useTheme<IAppTheme>();
  return theme;
};
