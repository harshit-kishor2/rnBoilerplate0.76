// Stack.tsx
import React, {ReactNode} from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface StackProps {
  children: ReactNode;
  style?: ViewStyle;
}

const Stack: React.FC<StackProps> = ({ children, style }) => {
  return <View style={[styles.stack, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  stack: {
    position: 'relative',
  },
});

export default Stack;
