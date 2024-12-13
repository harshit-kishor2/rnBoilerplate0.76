/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {appLanguageLocalStorage, appLanguageLocalStorageKeys, defaultDeviceLang, seti18nLanguage} from './utils';


/**
 * Interface representing the shape of the AppLocalizationContext.
 * Contains the currently applied language, the selected language preference and a method to change it.
 */
export type IAppLocalizationContext = {
  currentLanguage: ISelectedLangauge; // Currently applied language
  selectedLanguageType: ISelectedLangauge; // Selected language preference (e.g., 'auto', 'en', 'fr')
  setSelectedLanguageType: (langParam: ISelectedLangauge) => void; // Setter function for updating selected language
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
export const AppLocalizationContext = createContext<IAppLocalizationContext | undefined>(undefined);

/**
 * Hook to access the AppLocalizationContext.
 * Returns the currently applied language, the selected language preference and a method to change it.
 * Throws an error if used outside of AppLocalizationProvider.
 *
 * @returns The AppLocalizationContext object which contains the currently applied language and a method to change it.
 */
export const useAppLocalizationContext = () => {
  const context = useContext(AppLocalizationContext);
  if (!context) throw Error('useAppLocalizationContext must be used inside AppLocalizationProvider');
  return context;
};

/**
 * The AppLocalizationProvider component provides the AppLocalizationContext to its children.
 * It determines the currently applied language by checking the device's language settings and the user's selected language preference.
 * If the user's selected language preference is 'auto', it uses the device's language setting.
 * Otherwise, it uses the user's selected language preference.
 * When the user changes the selected language preference, it updates the currently applied language and saves the preference to storage.
 *
 * @param children React components to render within the AppLocalizationContext.
 * @returns A React component that provides the AppLocalizationContext to its children.
 */
export const AppLocalizationProvider = ({
  autoDetect = true,
  children,
}: React.PropsWithChildren<{autoDetect?: boolean}>) => {

  const deviceLang = useMemo(() => defaultDeviceLang, []); // Memoize deviceLang for stability

  const [selectedLanguageType, setSelectedLanguageType] = useState<ISelectedLangauge>('auto');


  /**
   * On mount, check if a language preference is saved in storage.
   * If so, set the selected language type to the saved preference.
   * If not, set the selected language type to 'auto'.
   */
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLangType = appLanguageLocalStorage.getString(appLanguageLocalStorageKeys.app_language_type) as ISelectedLangauge;
        setSelectedLanguageType(savedLangType ?? 'auto');
      } catch (error) {
        console.error('Error loading language from storage:', error);
        setSelectedLanguageType('auto');
      }
    };
    initializeLanguage();
  }, []);


  /**
   * Effect hook to save the selected language preference to storage and update the i18n language accordingly.
   * If the selected language preference is 'auto', it uses the device's language setting.
   * Otherwise, it uses the user's selected language preference.
   */
  useEffect(() => {
    try {
      appLanguageLocalStorage.set(appLanguageLocalStorageKeys.app_language_type, selectedLanguageType);
      const langToApply = (selectedLanguageType === 'auto' && autoDetect) ? deviceLang : selectedLanguageType;
      seti18nLanguage(langToApply);
    } catch (error) {
      console.error('Error saving language to storage or updating i18n:', error);
    }
  }, [selectedLanguageType, deviceLang, autoDetect]);

  /**
   * Determine the currently applied language based on the user's selected language preference and the device's language settings.
   * If the user's selected language preference is 'auto', use the device's language setting.
   * Otherwise, use the user's selected language preference.
   *
   * @type {ILanguageType}
   */
  const appliedLanguage: ISelectedLangauge = (selectedLanguageType === 'auto' && autoDetect)
    ? (deviceLang as ISelectedLangauge)
    : selectedLanguageType;


  /**
   * Create a memoized value for the AppLocalizationContext object.
   * The object contains the currently applied language, the selected language preference and a method to change it.
   * The value is memoized to prevent unnecessary re-renders.
   *
   * @type {IAppLocalizationContext}
   */
  const value: IAppLocalizationContext = useMemo(() => ({
    currentLanguage: appliedLanguage,
    selectedLanguageType,
    setSelectedLanguageType,
  }), [appliedLanguage, selectedLanguageType]);

  /**
   * Return the AppLocalizationProvider component that wraps the given children.
   * The AppLocalizationProvider component provides the AppLocalizationContext to its children.
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
