import React from 'react';
import {View, ViewStyle} from 'react-native';

interface PaddingProps {
  children: React.ReactNode;
  all?: number; // For uniform padding
  horizontal?: number; // Horizontal padding
  vertical?: number; // Vertical padding
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  style?: ViewStyle; // Additional styles
}

const Padding: React.FC<PaddingProps> = ({
  children,
  all,
  horizontal,
  vertical,
  left,
  right,
  top,
  bottom,
  style,
}) => {
  const paddingStyle: ViewStyle = {
    padding: all,
    paddingHorizontal: horizontal,
    paddingVertical: vertical,
    paddingLeft: left,
    paddingRight: right,
    paddingTop: top,
    paddingBottom: bottom,
  };

  return <View style={[paddingStyle, style]}>{children}</View>;
};

export default Padding;
