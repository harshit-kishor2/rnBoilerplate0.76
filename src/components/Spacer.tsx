import {rpHeight} from '@app/helpers/responsive';
import React from 'react';
import {DimensionValue, StyleSheet, View, ViewStyle} from 'react-native';

interface SpacerProps {
  height?: DimensionValue;
  width?: DimensionValue,
  backgroundColor?: string,
  style?: ViewStyle;
}
const Spacer: React.FC<SpacerProps> = ({
  height = rpHeight(10),
  width,
  backgroundColor,
  style
}: SpacerProps) => {
  return (
    <View style={StyleSheet.flatten([
      style,
      {height, width, backgroundColor}
    ])} />
  );
};

export default Spacer;