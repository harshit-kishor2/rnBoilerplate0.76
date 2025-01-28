import {MMKV} from 'react-native-mmkv';

export const appTokenLocalStorageKeys = {
  refresh_token : '@refresh_token',
  access_token : '@access_token'
}

export const appTokenLocalStorage: MMKV = new MMKV({
  id: 'app-token-local-storage-id',
  encryptionKey: 'my-random-key-for-encryption'
});


export const ApiConst = {
  TIMEOUT : 10000,  // 10 seconds timeout
  BASE_URL : 'https://api.example.com',
  REFRESH_TOKEN_PATH : '/auth/refresh',
  twitterUrl: 'https://twitter.com',
  privacyPolicyUrl: 'https://docs.example.org/extras/legal/privacy-policy',
  tAndCUrl: 'https://docs.example.org/extras/legal/terms-and-conditions-of-service'
};
