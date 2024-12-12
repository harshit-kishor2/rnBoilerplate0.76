import React from 'react';
import {LocalizationContextProvider} from './LocalizationContextProvider';
import {AppThemeContextProvider} from './ThemeContextProvider';

// Add all context providers to this array
const contexts = [
  LocalizationContextProvider,
  AppThemeContextProvider,
];

/**
 * MultipleContextProvider is a component that wraps its children with multiple context providers.
 * It iterates over the contexts array and dynamically applies each context provider to its children.
 *
 * @param children React components to be wrapped with the context providers.
 * @returns A React component that provides the specified contexts to its children.
 */
const MultipleContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  // Reduce over the contexts array to wrap them dynamically
  return contexts.reduceRight((acc, ContextProvider) => {
    return <ContextProvider>{acc}</ContextProvider>;
  }, children);
};

export default MultipleContextProvider;
