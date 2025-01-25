import Assets from '@app/assets';
import {rpFont, rpWidth} from '@app/helpers/responsive';
import {useAppTheme} from '@app/theme';
import React from 'react';
import {AnimatableNumericValue, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

interface AppTextProps {
  text?: string;
  children?: React.ReactNode | string;
  align?: TextAlign;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textTransform?: TextTransform;
  adjustsFontSizeToFit?: boolean;
  props?: TextProps;
  fontSize?: number,
  lineHeight?: number,
  fontFamily?: string,
  fontWeight?: FontWeight,
  color?: string;
  opacity?: AnimatableNumericValue;

}

const AppText: React.FC<AppTextProps> = ({
  text,
  children,
  align = 'auto',
  style,
  fontSize = rpFont(16),
  fontFamily = Assets.font.Roboto.regular,
  fontWeight = 'normal',
  lineHeight,
  color,
  opacity,
  ellipsizeMode,
  textTransform,
  numberOfLines,
  adjustsFontSizeToFit,
  ...props
}: AppTextProps) => {
  const theme = useAppTheme();
  return (
    <Text
      {...props}
      ellipsizeMode={ellipsizeMode}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={numberOfLines}
      style={StyleSheet.flatten([
        {
          textAlign: align,
          textTransform,
          color: color ? color : theme.colors.text,
          opacity,
          fontSize,
          fontFamily,
          fontWeight,
          lineHeight: lineHeight ?? fontSize + rpWidth(4)
        },
        style,
      ])}>
      {text ? text : children}
    </Text>
  );
};

export default AppText;