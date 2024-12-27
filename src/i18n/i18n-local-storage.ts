import {MMKV} from 'react-native-mmkv';


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
