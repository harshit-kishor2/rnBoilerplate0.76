import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface RowProps {
  children: React.ReactNode;
  style?: ViewStyle;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  backgroundColor?: string; // Adding a background color prop
}

const Row: React.FC<RowProps> = ({
  children,
  style,
  justifyContent = 'flex-start',
  alignItems = 'center',
  backgroundColor = 'transparent'
}) => {
  return (
    <View
      style={[
        styles.row,
        { justifyContent, alignItems, backgroundColor },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default Row;
