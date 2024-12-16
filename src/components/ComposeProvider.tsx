import React from 'react';

export type ContextItem = {
  provider: React.ComponentType<any>; // Type for a React context provider
  props?: Record<string, any>; // Props to pass to the context provider
};

type ComposeProvidersProps = {
  children: React.ReactNode;
  contexts: ContextItem[]; // Array of contexts with provider and props
};

const ComposeProviders: React.FC<ComposeProvidersProps> = ({
  children,
  contexts,
}) => {
  // Reduce over the contexts array to wrap them dynamically
  return contexts.reduceRight((acc, { provider: ProviderWrapper, props = {} }) => {
    return <ProviderWrapper {...props}>{acc}</ProviderWrapper>;
  }, children);
};

export default ComposeProviders;
