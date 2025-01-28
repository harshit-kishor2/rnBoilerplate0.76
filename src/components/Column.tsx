import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ColumnProps {
  children: React.ReactNode;
  style?: ViewStyle;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  backgroundColor?: string; // Adding a background color prop
}

const Column: React.FC<ColumnProps> = ({
  children,
  style,
  justifyContent = 'flex-start',
  alignItems = 'center',
  backgroundColor = 'transparent'
}) => {
  return (
    <View
      style={[
        styles.column,
        { justifyContent, alignItems, backgroundColor },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
});

export default Column;
