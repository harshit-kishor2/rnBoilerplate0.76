import Assets from '@app/assets';
import {AppFastImage, AppText, Container} from '@app/components';
import DeviceUtils from '@app/helpers/device-utils';
import {rpFont, rpWidth} from '@app/helpers/responsive-utils';
import {useAppTheme} from '@app/theme';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SplashView = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => splashScreenStyles(), []);

  // Animated values
  const rotateValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);

  React.useEffect(() => {
    rotateValue.value = withRepeat(
      withTiming(360, {duration: 2000, easing: Easing.linear}),
      -1,
      false
    );
    scaleValue.value = withRepeat(withTiming(1.2, {duration: 1000}), -1, true);
  }, []);

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
    <Container style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <AppFastImage
          source={Assets.image.SPLASH_IMAGE}
          style={styles.splsh_image}
        />
      </Animated.View>
      <View style={styles.version}>
        <AppText
          fontSize={rpFont(10)}
          text={`v${DeviceUtils.BUILD_VERSION}(${DeviceUtils.BUILD_NUMBER})`}
          color={theme.colors.primary}
        />
      </View>
    </Container>
  );
};

export default SplashView;

const splashScreenStyles = () =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    version: {
      position: 'absolute',
      bottom: 15,
      right: 25,
    },
    splsh_image: {
      height: rpWidth(200),
      width: rpWidth(200),
      borderRadius: rpWidth(100),
    },
  });
