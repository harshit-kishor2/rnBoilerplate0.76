// Row.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface RowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Row: React.FC<RowProps> = ({ children, style }) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Row;
