import {rpHeight, rpWidth} from '@app/helpers/responsive';
import {useAppTheme} from '@app/theme';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Text,
  ActivityIndicator,
  Pressable,
  PressableProps,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedButtonComponent =
  Animated.createAnimatedComponent(Pressable);

interface ExtraButtonProps {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: React.ReactNode;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  animated?: boolean;
  outlined?: boolean;
}

export type AnimatedButtonProps = Omit<
  PressableProps,
  'onPressIn' | 'onPressOut' | 'style'
> & {
  containerStyle?: StyleProp<ViewStyle>;
  animated?: boolean;
};

export type ButtonProps = AnimatedButtonProps & ExtraButtonProps;

export const AnimatedTouchableOpacity = React.memo(
  (props: AnimatedButtonProps) => {
    const {containerStyle, animated} = props;
    const scaleValue = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scaleValue.value}],
      };
    });

    return (
      <AnimatedButtonComponent
        style={[containerStyle, animatedButtonStyle]}
        onPressIn={() => animated && (scaleValue.value = withSpring(0.99))}
        onPressOut={() => animated && (scaleValue.value = withSpring(1))}
        {...props}>
        {props.children}
      </AnimatedButtonComponent>
    );
  }
);

const AppButton = React.memo((props: ButtonProps) => {
  const {
    buttonContainerStyle,
    title,
    titleContainerStyle,
    titleStyle,
    disabled = false,
    outlined = false,
    animated = false,
    loading = false,
  } = props;
  const theme = useAppTheme();

  return (
    <AnimatedTouchableOpacity
      animated={animated}
      containerStyle={[
        styles.buttonContainer,
        buttonContainerStyle,
        {
          backgroundColor: outlined ? theme.colors.background : theme.colors.primary,
          borderColor: theme.colors.primary,
          borderWidth: outlined ? 1 : 0,
          opacity: disabled ? 0.6 : 1,
        }]}
      {...props}>
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {loading ? <ActivityIndicator size={'small'} /> : null}
        {props.leftIcon}
        <Text style={[titleStyle]}>
          {title}
        </Text>
        {props.rightIcon}
      </View>
    </AnimatedTouchableOpacity>
  );
});

export default AppButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: rpWidth(60),
    height: rpHeight(45),
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});