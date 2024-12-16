
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import {MMKV} from 'react-native-mmkv';
import i18n from './i18n';
// dayjs locales for i18n
// Keep this list in sync with the locales in src/i18n/resources
// See https://github.com/iamkun/dayjs/tree/dev/src/locale
import 'dayjs/locale/en-gb';
import 'dayjs/locale/es';
import 'dayjs/locale/hi';


/**
 * An object containing the keys used to store language-related preferences in local storage.
 *
 * @type {Object<string, string>}
 * @property {string} app_language_type - Key for storing the selected language type preference.
 * @property {string} app_language - Key for storing the current language.
 */
export const appLanguageLocalStorageKeys: {[key: string]: string;} = {
  app_language_type: '@app_language_type', // Key for the selected language type
  app_language: '@app_language', // Key for the current language
};

/**
 * A local storage instance used to store the user's selected language and language type.
 *
 * @type {MMKV}
 * @property {string} id - The id of the storage instance.
 * @property {string} encryptionKey - The encryption key used to encrypt the stored data.
 */
export const appLanguageLocalStorage: MMKV = new MMKV({
  id: `app-langauge-local-storage`,
  encryptionKey: 'my-random-key-for-encryption'
});


/**
 * Sets the i18n language for the application.
 *
 * This function changes the language used by i18next and updates the dayjs locale
 * to match the specified language. It also saves the selected language to local storage
 * to persist the user's language preference.
 *
 * @param lang - The language code to set as the current language (e.g., 'en', 'es', 'hi').
 */
export const seti18nLanguage = async (lang: string) => {
  try {
    await i18n.changeLanguage(lang);
  } catch (error) {
    console.error('Error changing language in i18n:', error);
  }

  try {
    dayjs.locale(lang);
  } catch (error) {
    console.error('Error setting dayjs locale:', error);
  }

  try {
    appLanguageLocalStorage.set(appLanguageLocalStorageKeys.app_language, lang);
  } catch (error) {
    console.error('Error saving language to local storage:', error);
  }
};




/**
 * A hook that returns the i18n translation function.
 *
 * This hook uses the `useTranslation` hook from `react-i18next` to fetch the
 * i18n translation function, which is then returned as the result of this hook.
 *
 * @returns {function} The i18n translation function.
 */
export const useAppTranslation = () => {
  const {t: translate} = useTranslation();
  return translate;
};
