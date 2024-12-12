import React from 'react';
import {useAppThemeContext} from '@app/store/context/ThemeContextProvider';
import {PaperProvider} from 'react-native-paper';

/**
 * A wrapper component that provides the theme context to its children.
 *
 * This component listens to the currently applied theme from the AppThemeContext
 * and wraps its children with a PaperProvider using the current theme.
 *
 * @param children The component(s) to render within the theme context.
 * @returns A component that wraps its children with a PaperProvider.
 */
const AppThemeWrapper = ({children}: React.PropsWithChildren) => {
  const {currentTheme} = useAppThemeContext();
  return (
    <PaperProvider theme={currentTheme}>
      {children}
    </PaperProvider>
  );
};

export default AppThemeWrapper;