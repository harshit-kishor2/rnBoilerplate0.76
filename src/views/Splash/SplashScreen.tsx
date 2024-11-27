import Navigator from '@app/navigation/Navigator';
import React from 'react';
import SplashView from './ui/SplashView';
import useSplashScreen from './useSplashScreen';
const SplashScreen: React.FC = () => {
  const {isSplashEnd} = useSplashScreen();
  return (
    isSplashEnd ? <Navigator /> : <SplashView />
  );
};

export default SplashScreen;