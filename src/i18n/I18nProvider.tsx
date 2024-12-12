import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AppLocalizationProvider } from './AppLocalizationProvider';

type I18nProviderProps = {
  autoDetect?: boolean;
};

/**
 * The I18nProvider component is the top-level component that wraps the entire application with the i18next and AppLocalizationProvider components.
 * It provides the i18next instance and the language preference management from the AppLocalizationProvider component to all the children components.
 * The autoDetect prop is passed to the AppLocalizationProvider component to decide whether to use the device's language setting or not.
 */
const I18nProvider: React.FC<React.PropsWithChildren<I18nProviderProps>> = ({
  autoDetect = true,
  children,
}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <AppLocalizationProvider autoDetect={autoDetect}>
        {children}
      </AppLocalizationProvider>
    </I18nextProvider>
  );
};

export default I18nProvider;
