import {AppFastImage, AppText, Container} from '@app/components';
import {rpFont} from '@app/helpers';
import React from 'react';
import {View, } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import useSplashScreen from '../useSplashScreen';
import Assets from '@app/assets';

const SplashView = () => {
  const BUILD_VERSION = DeviceInfo.getVersion();
  const BUILD_NUMBER = DeviceInfo.getBuildNumber();
  const {styles, theme} = useSplashScreen();

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

export default SplashView;