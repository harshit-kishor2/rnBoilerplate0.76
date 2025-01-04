
import {useEffect, useMemo, useState} from 'react';
import splashScreenStyles from './SplashScreen.style';
import {useAppTheme} from '@app/theme';
import {useAppTranslation} from '@app/i18n';
import NavigationService from '@app/navigation/NavigationService';

const SPLASH_TIMEOUT = 5000;

const useSplashScreen = () => {
  const styles = useMemo(() => splashScreenStyles(), []);
  const [isSplashEnd, setIsSplashEnd] = useState(false);
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const hasAccountData = true;
  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, SPLASH_TIMEOUT);
  }, []);

  useEffect(() => {
    if(isSplashEnd) {
      // Perform navigation logic here
      if(hasAccountData) {
        // navigate to home screen
        NavigationService.replace({routeName: 'HomeRoute', fromRouteName: 'SplashRoute'});
      } else {
        // navigate to login screen
        NavigationService.replace({routeName: 'LoginRoute', fromRouteName: 'SplashRoute'});
      }

    }
  }, [isSplashEnd,hasAccountData]);

  return {
    styles,
    isSplashEnd,
    theme,
    translate,
  };
};

export default useSplashScreen;