/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useCallback} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
  TargetedEvent,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native';

import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useAppTheme} from '@app/theme';

export interface TextInputProps extends InputProps {
  name: string;
}

export type Variant = 'filled' | 'outlined' | 'standard';

export interface InputProps extends RNTextInputProps {
  /**
   * The variant of the TextInput style.
   * @default "filled"
   */
  variant?: Variant;
  /**
   * The label to display.
   */
  label?: string;
  /**
   * The element placed before the text input.
   */
  leftIcon?: React.ReactNode | null;
  /**
   * The element placed after the text input.
   */
  rightIcon?: React.ReactNode | null;
  /**
   * The helper text to display.
   */
  error?: string;
  /**
   * Callback function to call when user moves pointer over the input.
   */
  onMouseEnter?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /**
   * Callback function to call when user moves pointer away from the input.
   */
  onMouseLeave?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /**
   * The style of the container view.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The style of the text input container view.
   */
  inputContainerStyle?: StyleProp<ViewStyle>;
  /**
   * The style of the text input.
   */
  inputStyle?: RNTextInputProps['style'];
  /**
   * The style of the text input's leading element container.
   */
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * The style of the text input's trailing element container.
   */
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Background color of the input container style.
   * @default "white"
   */
  backgroundColor?: string;
  /**
   * On focus background color of the input container style.
   * @default "#e9e9e9"
   */
  onFocusBackgroundColor?: string;
  /**
   * Border color of the outline input container style.
   * @default "black"
   */
  borderColor?: string;
  /**
   * On focus Border color of the outline input container style.
   * @default "#0c5fed"
   */
  onFocusBorderColor?: string;
  /**
   * On hover background color of the filled input container style.
   * @default "#e9e9e9"
   */
  onHoverBackgroundColor?: string;
  /**
   * Label text color of the input.
   * @default "black"
   */
  labelColor?: string;
  /**
   * On focus Label text color change.
   * @default "#0c5fed"
   */
  onFocusLabelColor?: string;
  /**
   * On error or any helper text below text Input container style.
   */
  errorContainerStyle?: StyleProp<ViewStyle>;
  /**
   * On error or any helper text below text Input Text-Style.
   */
  errorStyle?: StyleProp<TextStyle>;
  /**
   * In outlined variant the gap border color.
   * @default white
   */
  outlineGapColor?: string;
}

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

const AppTextInput = React.memo(
  React.forwardRef((props: InputProps, ref?: React.Ref<RNTextInput | null>) => {
    const {
      backgroundColor = 'white',
      borderColor = 'black',
      error,
      errorContainerStyle,
      errorStyle,
      inputContainerStyle,
      inputStyle,
      label,
      labelColor = 'black',
      leftIcon,
      leftIconContainerStyle,
      onBlur,
      onFocus,
      onFocusBackgroundColor = '#e9e9e9',
      onFocusBorderColor = '#0c5fed',
      onFocusLabelColor = '#0c5fed',
      onHoverBackgroundColor = '#e9e9e9',
      onMouseEnter,
      onMouseLeave,
      outlineGapColor = 'white',
      placeholder,
      rightIcon,
      rightIconContainerStyle,
      style,
      variant = 'filled',
      ...rest
    } = props;

    const theme = useAppTheme();

    const styles = inputStyles(theme);

    const hovered = useSharedValue(false);
    const focused = useSharedValue(false);

    const handleMouseEnter = useCallback(
      (event: NativeSyntheticEvent<TargetedEvent>) => {
        onMouseEnter?.(event);
        hovered.value = true;
      },
      [hovered, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: NativeSyntheticEvent<TargetedEvent>) => {
        onMouseLeave?.(event);
        hovered.value = false;
      },
      [hovered, onMouseLeave]
    );

    const handleFocus = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(event);
        focused.value = true;
      },
      [focused, onFocus]
    );

    const handleBlur = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(event);
        focused.value = false;
      },
      [focused, onBlur]
    );

    const focusAnimation = useSharedValue(0);

    useDerivedValue(() => {
      focusAnimation.value = withTiming(focused.value ? 1 : 0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    }, [focused.value, focusAnimation.value]);

    const active = useDerivedValue(
      () => focused.value || (rest.value?.length || 0) > 0,
      [focused.value, rest.value]
    );

    const activeAnimation = useSharedValue(0);

    useDerivedValue(() => {
      activeAnimation.value = withTiming(active.value ? 1 : 0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    }, [active.value, activeAnimation.value]);

    const animatedInputContainerStyle = useAnimatedStyle(() => {
      return {
        backgroundColor:
          variant === 'filled'
            ? focused.value
              ? onFocusBackgroundColor
              : hovered.value
                ? onHoverBackgroundColor
                : backgroundColor
            : variant === 'outlined'
              ? backgroundColor
              : backgroundColor,
        borderBottomEndRadius: variant !== 'standard' ? 4 : 0,
        borderBottomStartRadius: variant !== 'standard' ? 4 : 0,
        borderTopEndRadius: 4,
        borderTopStartRadius: 4,
      };
    }, [focused.value, hovered.value, variant]);

    const animatedInput = useAnimatedStyle(() => {
      return {
        fontSize: 16,
        minHeight: variant === 'standard' ? 48 : 56,
        paddingEnd: rightIcon ? 12 : variant === 'standard' ? 0 : 16,
        paddingStart: leftIcon ? 12 : variant === 'standard' ? 0 : 16,
        paddingTop: variant === 'filled' && label ? 18 : 0,
      };
    }, [variant, leftIcon, rightIcon]);

    const animatedLeading = useAnimatedStyle(() => {
      return {
        marginStart: variant === 'standard' ? 0 : 12,
        marginVertical: variant === 'standard' ? 12 : 16,
      };
    }, [variant]);

    const animatedTrailing = useAnimatedStyle(() => {
      return {
        marginEnd: variant === 'standard' ? 0 : 12,
        marginVertical: variant === 'standard' ? 12 : 16,
      };
    }, [variant]);

    const animatedOutline = useAnimatedStyle(() => {
      return {
        borderBottomEndRadius: 4,
        borderBottomStartRadius: 4,
        borderColor: focused.value
          ? onFocusBorderColor
          : hovered.value
            ? onFocusBorderColor
            : borderColor,
        borderTopEndRadius: 4,
        borderTopStartRadius: 4,
        borderWidth: focused.value ? 2 : 1,
      };
    }, [focused.value, hovered.value]);

    const animatedOutlineLabelGap = useAnimatedStyle(() => {
      return {
        height: focused.value ? 2 : 1,
      };
    }, [focused.value]);

    const animatedLabelContainer = useAnimatedStyle(() => {
      return {
        height: variant === 'standard' ? 48 : 56,
        start:
          variant === 'standard' ? (leftIcon ? 36 : 0) : leftIcon ? 48 : 16,
      };
    }, [variant, leftIcon]);

    const animatedLabel = useAnimatedStyle(() => {
      return {
        color: interpolateColor(
          focusAnimation.value,
          [0, 1],
          [labelColor, onFocusLabelColor]
        ),
        fontSize: interpolate(activeAnimation.value, [0, 1], [16, 12]),
        transform: [
          {
            translateY: interpolate(
              activeAnimation.value,
              [0, 1],
              [
                0,
                variant === 'filled' ? -12 : variant === 'outlined' ? -28 : -24,
              ]
            ),
          },
        ],
      };
    }, [focusAnimation, activeAnimation]);

    const animatedPlaceholder = useAnimatedProps<TextInputProps>(() => {
      return {
        placeholder: label ? (focused.value ? placeholder : '') : placeholder,
      };
    }, [label, focused, placeholder]);

    const animatedUnderline = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          focusAnimation.value,
          [0, 1],
          [borderColor, onFocusBorderColor]
        ),
        transform: [{scaleX: focusAnimation.value}],
      };
    }, [focusAnimation.value]);

    const animatedOutlineLabel = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          activeAnimation.value,
          [0, 1],
          [backgroundColor, outlineGapColor]
        ),
        transform: [{scaleX: activeAnimation.value}],
      };
    }, [activeAnimation.value]);

    return (
      <View style={style}>
        <Animated.View
          style={[
            styles.inputContainer,
            animatedInputContainerStyle,
            inputContainerStyle,
          ]}>
          {leftIcon && (
            <Animated.View
              style={[styles.leading, animatedLeading, leftIconContainerStyle]}>
              {leftIcon}
            </Animated.View>
          )}

          <AnimatedTextInput
            ref={ref}
            style={[styles.input, animatedInput, inputStyle]}
            animatedProps={animatedPlaceholder}
            placeholderTextColor={theme.colors.red}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...({
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
              ...rest,
            } as any)}
          />

          {rightIcon && (
            <Animated.View
              style={[
                styles.trailing,
                animatedTrailing,
                rightIconContainerStyle,
              ]}>
              {rightIcon}
            </Animated.View>
          )}

          {(variant === 'filled' || variant === 'standard') && (
            <>
              <View
                style={[styles.underline, {backgroundColor: borderColor}]}
                pointerEvents="none"
              />
              <Animated.View
                style={[styles.underlineFocused, animatedUnderline]}
                pointerEvents="none"
              />
            </>
          )}

          {variant === 'outlined' && (
            <Animated.View
              style={[StyleSheet.absoluteFill, animatedOutline, styles.outline]}
              pointerEvents="none"
            />
          )}

          {label ? (
            <Animated.View
              style={[styles.labelContainer, animatedLabelContainer]}
              pointerEvents="none">
              {variant === 'outlined' && (
                <Animated.View
                  style={[
                    styles.outlineLabelGap,
                    animatedOutlineLabel,
                    animatedOutlineLabelGap,
                  ]}
                />
              )}
              <Animated.Text style={animatedLabel}>{label}</Animated.Text>
            </Animated.View>
          ) : null}
        </Animated.View>
        <View style={[styles.errorView, errorContainerStyle]}>
          {error ? (
            <Text style={[styles.helperText, errorStyle]}>{error}</Text>
          ) : null}
        </View>
      </View>
    );
  })
);

export default AppTextInput;

const inputStyles = (theme: AppTheme) =>
  StyleSheet.create({
    errorView: {
      marginHorizontal: 16,
      marginTop: 4,
    },
    helperText: {
      fontSize: 14,
    },
    input: {
      flex: 1,
      ...Platform.select({
        web: {
          outlineStyle: 'none',
        },
      }),
    },
    inputContainer: {
      flexDirection: 'row',
    },
    labelContainer: {
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
    },
    leading: {
      alignItems: 'center',
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    outline: {},
    outlineLabelGap: {
      backgroundColor: theme.colors.background,
      end: -4,
      position: 'absolute',
      start: -4,
      top: 0,
    },
    trailing: {
      alignItems: 'center',
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    underline: {
      bottom: 0,
      end: 0,
      height: 1,
      position: 'absolute',
      start: 0,
    },
    underlineFocused: {
      bottom: 0,
      end: 0,
      height: 2,
      position: 'absolute',
      start: 0,
    },
  });