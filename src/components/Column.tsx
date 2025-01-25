// Column.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ColumnProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Column: React.FC<ColumnProps> = ({ children, style }) => {
  return <View style={[styles.column, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default Column;
