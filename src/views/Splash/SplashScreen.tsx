import NavigationProvider from '@app/navigation/NavigationProvider';
import React from 'react';
import SplashView from './ui/SplashView';
import useSplashScreen from './useSplashScreen';
const SplashScreen: React.FC = () => {
  const {isSplashEnd} = useSplashScreen();
  return (
    isSplashEnd ? <NavigationProvider /> : <SplashView />
  );
};

export default SplashScreen;