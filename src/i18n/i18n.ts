import {initReactI18next} from 'react-i18next';
import {appLanguageLocalStorage, appLanguageLocalStorageKeys} from './utils';
import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {en, es, hi} from './resources';

/**
 * The resources object contains the translations for each language.
 * The keys are the language codes and the values are objects containing the translations.
 * The translations are objects with the key being the translation key and the value being the translation value.
 * @see https://www.i18next.com/overview/configuration-options#resources
 */
const resources = {
  en: {translation: en},
  es: {translation: es},
  hi: {translation: hi},
  //! Add more languages here
};


/**
 * A language detector that stores the user's selected language in local storage.
 *
 * When the user selects a language, it is stored in local storage using the key specified in appLanguageLocalStorageKeys.app_language.
 * The detect method is called when the app starts, and it checks if a language is stored in local storage.
 * If a language is stored, it is returned as the user's selected language.
 * If no language is stored, the method returns null.
 *
 * When the user changes their language preference, the cacheUserLanguage method is called to store the new language in local storage.
 *
 * @type {LanguageDetectorAsyncModule}
 */
const useLanguageStorage: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    const lang = appLanguageLocalStorage.getString(appLanguageLocalStorageKeys.app_language);
    if (lang) return callback(lang);
  },
  init: () => null,
  cacheUserLanguage: async (language: string) => {
    appLanguageLocalStorage.set(appLanguageLocalStorageKeys.app_language, language);
  },
};


/**
 * Initialize the i18next instance with the necessary settings.
 *
 * @see https://www.i18next.com/overview/configuration-options
 */
i18n
  .use(useLanguageStorage) // Use the language storage detector
  .use(initReactI18next) // Use the react-i18next plugin
  .init({
    compatibilityJSON: 'v3',  // Compatibility mode for the i18next JSON format.
    fallbackLng: 'en', // The default language to fall back to if a translation is not found.
    lng: 'en', // The default language to initialize the i18next instance with.
    resources: resources,
    react: {
      useSuspense: false,  // Whether to use the Suspense feature of React.
    },
    interpolation: {
      escapeValue: false,  // Whether to escape values when interpolating.
    },
  });

export default i18n;

