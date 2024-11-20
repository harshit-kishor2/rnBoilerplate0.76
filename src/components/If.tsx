import React, {ReactNode} from 'react';

type ConditionProps = {
  children: ReactNode;
  condition: boolean;
};

const If: React.FC<ConditionProps> = ({children, condition}: ConditionProps) => {
  return condition ? <>{children}</> : null;
};

export default If;
