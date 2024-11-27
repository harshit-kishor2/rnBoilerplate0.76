
import {useAppTheme} from '@app/theme';
import {useMemo} from 'react';
import settingScreenStyles from './SettingScreen.style';
import {useAppTranslation} from '@app/i18n';

const useSettingScreen = () => {
  const theme = useAppTheme();
  const t = useAppTranslation();
  const styles = useMemo(() => settingScreenStyles(theme), [theme]);
  return {
    styles,
    theme,
    t
  };
};

export default useSettingScreen;
