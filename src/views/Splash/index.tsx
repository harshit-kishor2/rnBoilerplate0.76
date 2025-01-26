import Assets from '@app/assets';
import {AppFastImage, AppText, Container, Positioned, Stack} from '@app/components';
import {DeviceUtils, rpFont, rpWidth} from '@app/helpers';
import NavigationService from '@app/navigation/NavigationService';
import {useAppTheme} from '@app/theme';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

const SPLASH_TIMEOUT = 5000;
const {BUILD_VERSION, BUILD_NUMBER} = DeviceUtils;


const SplashScreen: React.FC = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => splashScreenStyles(), []);
  const [isSplashEnd, setIsSplashEnd] = useState(false);

  const hasAccountData = false;

  const rotateValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);

  React.useEffect(() => {
    rotateValue.value = withRepeat(withTiming(360, {duration: 2000, easing: Easing.linear}), -1, false);
    scaleValue.value = withRepeat(withTiming(1.2, {duration: 1000}), -1, true);
  }, []);


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

  // Animated style for rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotateValue.value}deg`},
        {scale: scaleValue.value},
      ],
    };
  });

  return (
    <Stack style={{flex: 1}}>
      <Container style={styles.container}>
        <Animated.View style={[animatedStyle]}>
          <AppFastImage
            source={Assets.image.SPLASH_IMAGE}
            style={styles.splsh_image}
          />
        </Animated.View>
      </Container>
      <Positioned
        right={25}
        bottom={15}
      >
        <AppText
          fontSize={rpFont(10)}
          text={`v${BUILD_VERSION}(${BUILD_NUMBER})`}
          color={theme.colors.primary}
        />
      </Positioned>
    </Stack>
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
      bottom: 15,
      right: 25
    },
    splsh_image: {
      height: rpWidth(200),
      width: rpWidth(200),
      borderRadius: rpWidth(100)
    }
  });