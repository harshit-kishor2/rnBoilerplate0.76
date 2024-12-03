import React from 'react';
import {LocalizationContextProvider} from './LocalizationContextProvider';
import {AppThemeContextProvider} from './ThemeContextProvider';

const MultipleContextProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <LocalizationContextProvider>
      <AppThemeContextProvider>
        {children}
      </AppThemeContextProvider>
    </LocalizationContextProvider>
  );
};

export default MultipleContextProvider;
