import React from 'react';
import {View} from 'react-native';

interface SizedBoxProps {
  width?: number;
  height?: number;
}
const SizedBox: React.FC<SizedBoxProps> = ({width, height}) => (
  <View style={{width, height}} />
);

export default SizedBox;