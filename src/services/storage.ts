import {MMKV} from 'react-native-mmkv';

/**
 * Keys used to store data in storage.
 * @type {Object<string, string>}
 */
export const storageKeys = {
  langauge: '@langauge',
  access_token: '@access_token',
  refresh_token: '@refresh_token',
};

/**
 * Storage instance
 * @type {MMKV}
 */
const storage: MMKV = new MMKV({
  id: `app-local-storage`,
  // path: `${'USER_DIRECTORY'}/storage`,
  encryptionKey: 'hunter2'
});

// console.log("storage===>", storage)

//? if you want to debug storage value then uncomment below
// import {initializeMMKVFlipper} from 'react-native-mmkv-flipper';
// if (__DEV__) {
//   initializeMMKVFlipper({default: storage});
// }

export default storage;