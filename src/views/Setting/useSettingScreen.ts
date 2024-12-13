
import {useAppTheme} from '@app/theme/themes';
import {useMemo} from 'react';
import settingScreenStyles from './SettingScreen.style';
import {useAppTranslation} from '@app/i18n/utils';

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
