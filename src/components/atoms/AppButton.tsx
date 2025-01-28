import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  ActivityIndicator,
  Pressable,
  PressableProps,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import AppText from './AppText';
import {useAppTheme} from '@app/theme';

const AnimatedButtonComponent =
  Animated.createAnimatedComponent(Pressable);

interface ExtraButtonProps {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: React.ReactNode;
  right?: JSX.Element;
  left?: JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  animated?: boolean;
  outlined?: boolean;
  backgroundColor?: string;
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
    const {containerStyle, animated, children} = props;
    const scaleValue = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scaleValue.value}],
      };
    });

    const handlePressIn = () => {
      if (animated) scaleValue.value = withSpring(0.99);
    };

    const handlePressOut = () => {
      if (animated) scaleValue.value = withSpring(1);
    };

    return (
      <AnimatedButtonComponent
        style={[containerStyle, animatedButtonStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}>
        {children}
      </AnimatedButtonComponent>
    );
  }
);

const AppButton: React.FC<ButtonProps> = (props) => {
  const {
    buttonContainerStyle,
    title,
    titleContainerStyle,
    titleStyle,
    left,
    right,
    backgroundColor,
    disabled = false,
    outlined = false,
    animated = false,
    loading = false,
    ...rest
  } = props;

  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <AnimatedTouchableOpacity
      animated={animated}
      containerStyle={[
        styles.buttonContainer,
        buttonContainerStyle,
        {
          backgroundColor: outlined ? 'transparent' : (backgroundColor ?? theme.colors.primary),
          borderColor: backgroundColor ?? theme.colors.primary,
          borderWidth: outlined ? 1 : 0,
          opacity: disabled ? 0.6 : 1,
        }]}
      disabled={disabled}
      {...rest}>
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {loading && <ActivityIndicator size="small" />}
        {left}
        {title && <AppText style={StyleSheet.flatten([styles.titleStyle, titleStyle])}>{title}</AppText>}
        {right}
      </View>
    </AnimatedTouchableOpacity>
  );
};

export default AppButton;

const createStyles = (theme: IAppTheme) => StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 60,
    height: 50,
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  titleStyle: {
    color: theme.colors.text,
  },
});
