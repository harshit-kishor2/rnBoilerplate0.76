import React from 'react';
import {DemoProvider} from './DemoProvider';

export type ContextItem = {
  provider: React.ComponentType<any>; // Type for a React context provider
  props?: Record<string, any>; // Props to pass to the context provider
};

const contexts: ContextItem[] = [
  {
    provider: DemoProvider,
    props: {},
  },
];

type ComposeProvidersProps = {
  children: React.ReactNode;
};

const CombinedContextProvider: React.FC<ComposeProvidersProps> = ({
  children,
}) => {
  // Reduce over the contexts array to wrap them dynamically
  return contexts.reduceRight((acc, { provider: ProviderWrapper, props = {} }) => {
    return <ProviderWrapper {...props}>{acc}</ProviderWrapper>;
  }, children);
};

export default CombinedContextProvider;
