
import {useEffect, useMemo, useState} from 'react';
import splashScreenStyles from './SplashScreen.style';
import {useAppTheme} from '@app/theme/themes';
import {useAppTranslation} from '@app/i18n/utils';

const SPLASH_TIMEOUT = 5000;

const useSplashScreen = () => {
  const styles = useMemo(() => splashScreenStyles(), []);
  const [isSplashEnd, setIsSplashEnd] = useState(false);
  const theme = useAppTheme();
  const t = useAppTranslation();
  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, SPLASH_TIMEOUT);
  }, []);

  return {
    styles,
    isSplashEnd,
    theme,
    t,
  };
};

export default useSplashScreen;