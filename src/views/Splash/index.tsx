import Assets from '@app/assets';
import {AppFastImage, AppText, Container} from '@app/components';
import {DeviceUtils, rpFont, rpWidth} from '@app/helpers';
import NavigationService from '@app/navigation/NavigationService';
import {useAppTheme} from '@app/theme';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

const SPLASH_TIMEOUT = 5000;
const {BUILD_VERSION, BUILD_NUMBER} = DeviceUtils;


const SplashScreen: React.FC = () => {

  const [isSplashEnd, setIsSplashEnd] = useState(false);

  const hasAccountData = true;

  const theme = useAppTheme();
  const styles = useMemo(() => splashScreenStyles(), []);
  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, SPLASH_TIMEOUT);
  }, []);

  useEffect(() => {
    if (isSplashEnd) {
      // Perform navigation logic here
      if (hasAccountData) {
        // navigate to home screen
        NavigationService.replace({routeName: 'HomeRoute', fromRouteName: 'SplashRoute'});
      } else {
        // navigate to login screen
        NavigationService.replace({routeName: 'LoginRoute', fromRouteName: 'SplashRoute'});
      }
    }
  }, [isSplashEnd, hasAccountData]);

  return (
    <Container style={styles.container}>
      <AppFastImage
        source={Assets.image.SPLASH_IMAGE}
        style={styles.splsh_image}
      />
      <View style={styles.version}>
        <AppText
          fontSize={rpFont(10)}
          text={`v${BUILD_VERSION}(${BUILD_NUMBER})`}
          color={theme.colors.primary}
        />
      </View>
    </Container>
  );
};

export default SplashScreen;

const splashScreenStyles = () =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    version: {
      position: 'absolute',
      bottom: 5,
      right: 5
    },
    splsh_image: {
      height: rpWidth(200),
      width: rpWidth(200),
      borderRadius: rpWidth(100)
    }
  });