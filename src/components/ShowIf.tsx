import React, {ReactNode} from 'react';
import {View} from 'react-native';

type RenderIfProps = {
  condition: boolean;
  children: ReactNode;
};

const ShowIf = ({children, condition}: RenderIfProps) => {
  if (condition) {
    return <>{children}</>;
  }
  return <View />;
};

export default ShowIf;
