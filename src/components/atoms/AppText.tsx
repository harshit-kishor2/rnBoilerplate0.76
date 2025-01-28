import Assets from '@app/assets';
import {useAppTheme} from '@app/theme';
import React from 'react';
import {
  AnimatableNumericValue,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  GestureResponderEvent,
  Pressable,
} from 'react-native';

interface AppTextProps {
  text?: string;
  children?: React.ReactNode | string;
  align?: TextAlign;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textTransform?: TextTransform;
  adjustsFontSizeToFit?: boolean;
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;
  fontWeight?: FontWeight;
  color?: string;
  opacity?: AnimatableNumericValue;
  onPress?: (event: GestureResponderEvent) => void;
  props?: TextProps;
}

const AppText: React.FC<AppTextProps> = ({
  text,
  children,
  align = 'auto',
  style,
  fontSize = 16,
  fontFamily = Assets.font.Roboto.regular,
  fontWeight = 'normal',
  lineHeight,
  color,
  opacity,
  ellipsizeMode,
  textTransform,
  numberOfLines,
  adjustsFontSizeToFit,
  onPress,
  ...props
}: AppTextProps) => {
  const theme = useAppTheme();
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Text
        {...props}
        ellipsizeMode={ellipsizeMode}
        adjustsFontSizeToFit={adjustsFontSizeToFit}
        numberOfLines={numberOfLines}
        style={StyleSheet.flatten([
          {
            textAlign: align,
            textTransform,
            color: color ?? (onPress ? theme.colors.blue : theme.colors.text),
            opacity,
            fontSize,
            fontFamily,
            fontWeight,
            lineHeight: lineHeight ?? fontSize + 4
          },
          style,
        ])}>
        {text ?? children}
      </Text>
    </Pressable>
  );
};

export default AppText;
