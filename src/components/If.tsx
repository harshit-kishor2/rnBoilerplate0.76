import React, {ReactNode} from 'react';
import {View} from 'react-native';

type ConditionProps = {
  children: ReactNode;
  condition: boolean;
};

const If: React.FC<ConditionProps> = ({children, condition}: ConditionProps) => {
  if(condition) {
    return <>{children}</>;
  }
  return <View/>;
};

export default If;
