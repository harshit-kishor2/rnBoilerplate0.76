// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import {en, es, hi} from '@app/i18n/resources';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'en';
    // custom resources type
    resources: {
      en: typeof en;
      es: typeof es;
      hi: typeof hi;
    };
    // other
  }
}