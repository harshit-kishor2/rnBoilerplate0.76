import { MMKV } from 'react-native-mmkv';
import {useCounterStore} from './useCounterStore';

// Initialize MMKV instance
const zustandLocalStorage = new MMKV({
  id: 'zustand-local-storage',
  encryptionKey: 'zustandLocalStorageEncryptionKey'
});

// MMKV storage adapter for Zustand
export const zustandPersistStorage = {
  getItem: (key: string) => {
    const value = zustandLocalStorage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key: string, value: any) => {
    zustandLocalStorage.set(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    zustandLocalStorage.delete(key);
  },
};

// Central reset function for all stores
export const resetAllStores = () => {
  useCounterStore.getState().reset(); // Reset counter store
};