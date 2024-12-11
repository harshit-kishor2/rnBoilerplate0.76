/* eslint-disable no-unused-vars */
import {seti18nLanguage} from '@app/i18n';
import storage, {storageKeys} from '@app/services/storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {getLocales} from 'react-native-localize';


/**
 * Interface representing the shape of the AppLocalizationContext.
 * Contains the currently applied language, the selected language preference and a method to change it.
 */
export type AppLocalizationContextType = {
  currentLanguage: ILanguageType; // Currently applied language
  selectedLanguageType: ILanguageType; // Selected language preference (e.g., 'auto', 'en', 'fr')
  setSelectedLanguageType: (langParam: ILanguageType) => void; // Setter function for updating selected language
};

/**
 * The AppLocalizationContext is a React context that provides the currently applied language,
 * the selected language preference and a method to change it.
 *
 * The context is created using the `createContext` hook from the React library.
 * The initial value of the context is `undefined`.
 *
 * The context is used by the `useAppLocalizationContext` hook to access the currently applied language,
 * the selected language preference and a method to change it.
 */
export const AppLocalizationContext = createContext<AppLocalizationContextType | undefined>(undefined);

/**
 * Hook to access the AppLocalizationContext.
 * Returns the currently applied language, the selected language preference and a method to change it.
 * Throws an error if used outside of AppLocalizationContextProvider.
 *
 * @returns The AppLocalizationContext object which contains the currently applied language and a method to change it.
 */
export const useAppLocalizationContext = () => {
  const context = useContext(AppLocalizationContext);
  if (!context) throw Error('useAppLocalizationContext must be used inside AppLocalizationContextProvider');
  return context;
};

/**
 * The LocalizationContextProvider component provides the AppLocalizationContext to its children.
 * It determines the currently applied language by checking the device's language settings and the user's selected language preference.
 * If the user's selected language preference is 'auto', it uses the device's language setting.
 * Otherwise, it uses the user's selected language preference.
 * When the user changes the selected language preference, it updates the currently applied language and saves the preference to storage.
 *
 * @param children React components to render within the AppLocalizationContext.
 * @returns A React component that provides the AppLocalizationContext to its children.
 */
export const LocalizationContextProvider = ({children}: React.PropsWithChildren) => {
  const [selectedLanguageType, setSelectedLanguageType] = useState<ILanguageType>('auto');
  const deviceLang = getLocales()[0].languageCode;

  /**
   * On mount, check if a language preference is saved in storage.
   * If so, set the selected language type to the saved preference.
   * If not, set the selected language type to 'auto'.
   */
  useEffect(() => {
    const savedLangType = storage.getString(storageKeys.app_language_type) as ILanguageType;
    setSelectedLanguageType(savedLangType ?? 'auto');
  }, []);


  /**
   * Effect hook to save the selected language preference to storage and update the i18n language accordingly.
   * If the selected language preference is 'auto', it uses the device's language setting.
   * Otherwise, it uses the user's selected language preference.
   */
  useEffect(() => {
    if (selectedLanguageType) {
      // Save the selected language preference to storage
      storage.set(storageKeys.app_language_type, selectedLanguageType);

      // Update the i18n language accordingly
      if (selectedLanguageType === 'auto') {
        // If the selected language preference is 'auto', use the device's language setting
        seti18nLanguage(deviceLang);
      } else {
        // Otherwise, use the user's selected language preference
        seti18nLanguage(selectedLanguageType);
      }
    }
  }, [selectedLanguageType, deviceLang]);

  /**
   * Determine the currently applied language based on the user's selected language preference and the device's language settings.
   * If the user's selected language preference is 'auto', use the device's language setting.
   * Otherwise, use the user's selected language preference.
   *
   * @type {ILanguageType}
   */
  const appliedLanguage: ILanguageType = selectedLanguageType === 'auto'
    ? (deviceLang as ILanguageType)
    : selectedLanguageType;

  /**
   * Create a memoized value for the AppLocalizationContext.
   * The value is an object with the following properties:
   * - currentLanguage: the currently applied language, determined by the user's selected language preference and the device's language settings.
   * - selectedLanguageType: the user's selected language preference.
   * - setSelectedLanguageType: a function to update the user's selected language preference.
   *
   * @type {{currentLanguage: ILanguageType, selectedLanguageType: ILanguageType, setSelectedLanguageType: (langParam: ILanguageType) => void}}
   */
  const value = useMemo(() => ({
    currentLanguage: appliedLanguage,
    selectedLanguageType,
    setSelectedLanguageType,
  }), [appliedLanguage, selectedLanguageType]);

  /**
   * Return the AppLocalizationContextProvider component that wraps the given children.
   * The AppLocalizationContextProvider component provides the AppLocalizationContext to its children.
   * It determines the currently applied language by checking the device's language settings and the user's selected language preference.
   * If the user's selected language preference is 'auto', it uses the device's language setting.
   * Otherwise, it uses the user's selected language preference.
   * When the user changes the selected language preference, it updates the currently applied language and saves the preference to storage.
   *
   * @param children React components to render within the AppLocalizationContext.
   * @returns A React component that provides the AppLocalizationContext to its children.
   */
  return (
    <AppLocalizationContext.Provider value={value}>
      {/* Render the given children within the AppLocalizationContext */}
      {children}
    </AppLocalizationContext.Provider>
  );
};
