
import {useMemo} from 'react';
import settingScreenStyles from './SettingScreen.style';
import {useAppTheme} from '@app/theme';
import {useAppTranslation} from '@app/i18n';

const useSettingScreen = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => settingScreenStyles(theme), [theme]);
  return {
    styles,
    theme,
    translate
  };
};

export default useSettingScreen;
