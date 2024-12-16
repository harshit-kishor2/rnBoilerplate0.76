
import {useEffect, useMemo, useState} from 'react';
import splashScreenStyles from './SplashScreen.style';
import {useAppTheme} from '@app/theme';
import {useAppTranslation} from '@app/i18n';

const SPLASH_TIMEOUT = 5000;

const useSplashScreen = () => {
  const styles = useMemo(() => splashScreenStyles(), []);
  const [isSplashEnd, setIsSplashEnd] = useState(false);
  const theme = useAppTheme();
  const translate = useAppTranslation();
  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, SPLASH_TIMEOUT);
  }, []);

  return {
    styles,
    isSplashEnd,
    theme,
    translate,
  };
};

export default useSplashScreen;