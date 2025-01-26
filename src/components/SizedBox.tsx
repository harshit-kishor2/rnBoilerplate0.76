import React from 'react';
import { View } from 'react-native';

const SizedBox = ({ width, height }: { width?: number; height?: number }) => (
  <View style={{ width, height }} />
);

export default SizedBox;