
import {useAppTheme, useAppTranslation} from '@app/hooks';
import {useMemo} from 'react';
import homeScreenStyles from './HomeScreen.style';

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
