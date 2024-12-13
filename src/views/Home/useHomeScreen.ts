
import {useMemo} from 'react';
import homeScreenStyles from './HomeScreen.style';
import {useAppTheme} from '@app/theme';
import {useAppTranslation} from '@app/i18n';

const useHomeScreen = () => {
  const theme = useAppTheme();
  const t = useAppTranslation();
  const styles = useMemo(() => homeScreenStyles(theme), [theme]);
  return {
    styles,
    theme,
    t
  };
};

export default useHomeScreen;
