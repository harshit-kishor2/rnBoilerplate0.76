// Positioned.tsx
import React, {ReactNode} from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface PositionedProps {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  children: ReactNode;
  style?: ViewStyle;
}

const Positioned: React.FC<PositionedProps> = ({
  top,
  left,
  right,
  bottom,
  children,
  style,
}) => {
  return (
    <View
      style={[
        styles.positioned,
        {
          top,
          left,
          right,
          bottom,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  positioned: {
    position: 'absolute',
  },
});

export default Positioned;
