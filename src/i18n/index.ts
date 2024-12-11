
import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import {en, es, hi} from './resources';
import dyajs from 'dayjs';
// dayjs locales for i18n
// Keep this list in sync with the locales in src/i18n/resources
// See https://github.com/iamkun/dayjs/tree/dev/src/locale
import 'dayjs/locale/hi';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/es';
import storage, {storageKeys} from '@app/services/storage';
/**
 * Mapping of locales to their corresponding translation files.
 *
 * @type {Object}
 */
const locales = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  hi: {
    translation: hi,
  },
};

// A language detector module that uses shared preferences to store and retrieve the user's selected language.
// The 'detect' method retrieves the language from shared preferences and calls the callback with it.
// The 'cacheUserLanguage' method stores the user's selected language in shared preferences.
const useLanguageStorage: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    const lang = storage.getString(storageKeys.app_language);
    if (lang) return callback(lang);
  },
  init: () => null,
  cacheUserLanguage: async (language: string) => {
    storage.set(storageKeys.app_language, language);
  },
};


// Initialize i18n with the language detector and resources
// The compatibilityJSON option ensures that translation files are in the v3 format
// The fallbackLng option specifies the default language to use if the user's language is not supported
// The resources option provides the translations for each language
// The lng option specifies the default language to use
// The react option specifies that the app is a React app and useSuspense should be false
// The interpolation option specifies that values should not be escaped in the translations
i18n
  .use(useLanguageStorage)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: locales,
    lng: 'en',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },

  });

export default i18n;



/**
 * Returns a function that can be used to translate text using the i18next library.
 *
 * @return {function} A function that takes a translation key as input and returns the translated text.
 */
export const useAppTranslation = () => {
  const {t} = useTranslation();
  return t;
};


/**
 * Changes the application language and updates the i18next and dayjs locales accordingly.
 *
 * @param {string} lang The language to change to.
 */
export const seti18nLanguage = (lang: string) => {
  i18n.changeLanguage(`${lang}`);
  dyajs.locale(`${lang}`);
  storage.set(storageKeys.app_language, lang); // Save the selected language as the current language.
};
