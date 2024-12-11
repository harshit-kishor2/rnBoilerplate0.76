/* eslint-disable no-unused-vars */
import {setAppLanguage} from '@app/i18n';
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
 * Contains the current language and a method to change the language.
 */
export type AppLocalizationContextType = {
  currentLangauge: ILanguageType;
  selectedLangaugeType: ILanguageType;
  setSelectedLangaugeType: (langParam: ILanguageType) => void;
};

/**
 * Context to manage the application's language.
 * Provides the current language and a method to change the language.
 * Initially set to undefined and should be used within LocalizationContextProvider.
 */
export const AppLocalizationContext = createContext<AppLocalizationContextType | undefined>(undefined);

/**
 * Hook to access the localization context.
 * This hook will throw an error if it is used outside of AppLocalizationContextProvider.
 *
 * @returns The localization context object which contains the current language and a method to change it.
 */
export const useAppLocalizationContext = () => {
  const context = useContext(AppLocalizationContext);
  if (!context) throw Error('useAppLocalizationContext must be used inside AppLocalizationContext');
  return context;
};

/**
   * LocalizationContextProvider component provides language management functionality.
   * It determines the language based on device settings and saved preferences,
   * then provides the language and a function to change it through context.
   * @param {{children: React.ReactNode | React.ReactNode[]}} props Component props
   * @returns {JSX.Element} The LocalizationContextProvider component.
   */
export const LocalizationContextProvider = ({children}: React.PropsWithChildren) => {
  const [selectedLangaugeType, setSelectedLangaugeType] = useState<ILanguageType | 'auto'>('en');
  const deviceLang = getLocales()[0].languageCode;

  /**
 * Function to load the saved language from storage.
 * If 'auto', sets the language to the device's language.
 * If a valid language is found, sets the language to it.
 * Defaults to 'en' if no valid saved language is found.
 */
  const loadSavedLangauge = () => {
    const savedLang = storage.getString(storageKeys.app_language) as ILanguageType;
    if (savedLang) {
      setSelectedLangaugeType(savedLang);
    } else {
      setSelectedLangaugeType('en');
    }
  };

  /**
   * Effect to load the saved language from storage when the component mounts.
   * This effect is necessary to initialize the language state with the saved language.
   */
  useEffect(() => {
    loadSavedLangauge();
  }, []);

  /**
   * Effect to save the current language to storage and set it to the i18n and dayjs libraries.
   * This effect is triggered whenever the language state changes.
   */
  useEffect(() => {
    /**
     * Save the current language to storage.
     * This is necessary so that the language is persisted across app restarts.
     */
    if (selectedLangaugeType) {
      storage.set(storageKeys.app_language, selectedLangaugeType);
    }

    /**
     * Set the current language to the i18n and dayjs libraries.
     * This will cause any translations and date formatting to be updated based on the new language.
     */
    if (selectedLangaugeType) {
      setAppLanguage(selectedLangaugeType);
    }
  }, [selectedLangaugeType]);


  // Determine the applied theme
  let appliedLanguage: ILanguageType;
  if (selectedLangaugeType === 'auto') {
    appliedLanguage = deviceLang as ILanguageType;
  }else if (selectedLangaugeType) {
    appliedLanguage = selectedLangaugeType;
  }else{
    appliedLanguage = 'en' as ILanguageType;
  }


  /**
   * Creates a memoized version of the AppLocalizationContextType.
   * The memoization is necessary because the value depends on the language state, which can change.
   * The useMemo hook ensures that the value is only recreated when the language state changes.
   */
  const value: AppLocalizationContextType = useMemo(() => {
    /**
     * The AppLocalizationContextType value is an object with two properties:
     * - languageInApp: the current language
     * - setLanguageInApp: a function to set the language
     */
    return {
      currentLangauge: appliedLanguage,
      /**
       * The current language.
       * This is the language that is currently being used in the app.
       */
      selectedLangaugeType,
      /**
       * A function to set the language.
       * This function is used to update the language state and trigger a re-render.
       */
      setSelectedLangaugeType,
    };
  }, [appliedLanguage, selectedLangaugeType, setSelectedLangaugeType]);

  return (
    <AppLocalizationContext.Provider value={value}>
      {children}
    </AppLocalizationContext.Provider>
  );
};
