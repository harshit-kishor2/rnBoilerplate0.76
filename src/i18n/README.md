# i18n Module Documentation

This module provides a localization solution for React Native apps, enabling easy internationalization (i18n) with support for multiple languages. It integrates with `react-i18next` and supports auto-detection of the user's device language as well as customizable language preferences.

##### Features
- Language detection (based on device settings)
- Support for multiple languages (e.g., English, Spanish, Hindi)
- Auto language switching based on user preferences
- Local storage persistence for language preferences
- Simple hooks and provider setup for integration in React Native apps

---

## Table of Contents

- [Installation](#installation)
- [Setup and Usage](#setup-and-usage)
- [File Structure](#file-structure)
- [Available Functions](#available-functions)
- [Conclusion](#conclusion)

---

## Installation

To integrate the i18n module into your React Native project, follow these steps:

1. **Install dependencies**:

   ```bash
   yarn add react-i18next i18next dayjs react-native-localize react-native-mmkv
   yarn add --dev @types/i18next
   ```


2. **Copy the `i18n` Module**

- Copy the i18n folder (containing all the files) to your project.
- Ensure that the resources folder contains your language JSON files (en.json, es.json, hi.json).

## Setup and Usage

After adding the i18n module to your project, follow these steps:

#### 1. Configure i18n in your App

In your App.tsx (or main entry file), wrap your app with the `AppI18nProvider` to enable localization context throughout your app
`AppI18nProvider` is the top-level component responsible for initializing i18n and setting up language context. You can optionally enable auto-detection of the device's language.

**Props:**
- autoDetect (boolean, default: true): If `true`, it will automatically detect the device's language setting. Otherwise, it will use the user's selected language preference.

Example usage:

```javascript
import { AppI18nProvider } from '@app/i18n'; // Path to your i18n module

const App = () => (
  <AppI18nProvider autoDetect={true}>
    {/* Your app's components */}
  </AppI18nProvider>
);

```

#### 2. Usage of Translations

The useAppTranslation hook provides the i18n translation function for translating text in your components.

```javascript
import { useAppTranslation } from './i18n';

const MyComponent = () => {
  const translate = useAppTranslation();

  return <p>{translate('welcome_message')}</p>;
};

```


#### 3. (Optional) Manually Set the Language

The `useAppLocalizationContext` hook allows you to access the current language and change the selected language preference.

**Returns:**
- 	currentLanguage: The currently applied language (e.g., 'en', 'es', 'hi').
- 	selectedLanguageType: The selected language preference (e.g., 'auto', 'en', 'es').
- 	setSelectedLanguageType: A function to set the selected language.

```javascript
import { useAppLocalizationContext } from './i18n';

const MyComponent = () => {
  const { currentLanguage, setSelectedLanguageType } = useAppLocalizationContext();

  return (
    <div>
      <p>Current Language: {currentLanguage}</p>
      <button onClick={() => setSelectedLanguageType('es')}>Switch to Spanish</button>
    </div>
  );
};

```
### How to Add More Languages
- Add a new language JSON file in the resources folder, such as fr.json for French.
- In the `i18n.ts` file, update the resources object to include the new language.
- In the `react-18next.d.ts` file, update the resources object to include the new language and update `ILanguageType`.
- In the `utils.ts` file , import dayjs locales for that language.



## File Structure
Here’s a breakdown of the folder structure and what each file does:

```graphql
i18n/
  ├── resources/
  │   ├── en.json          # English translations
  │   ├── es.json          # Spanish translations
  │   ├── hi.json          # Hindi translations
  │   └── index.ts         # Combines all translation files and exports them
  ├── AppLocalizationProvider.tsx  # Context provider for managing language preferences
  ├── i18n.ts              # i18n initialization and configuration
  ├── AppI18nProvider.tsx     # Combines i18n and AppLocalizationProvider for localization
  ├── index.ts             # Main entry point for exporting functions and hooks
  ├── react-18next.d.ts    # TypeScript definitions for react-i18next
  ├── README.md            # Main usage guide
  └── utils.js             # Utility functions for language storage and handling

```

#### Detailed Explanation:
- **resources/:** Contains language JSON files (en.json, es.json, hi.json, etc.) that hold the translations for each language. Each JSON file consists of key-value pairs for translated text.

- **AppLocalizationProvider.tsx:** This component provides the context for managing and updating the current language preference. It detects the device language by default and allows users to set a language preference.

- **i18n.ts:** This file initializes the i18n instance and configures the language detector, fallback language, and translation resources.

- **AppI18nProvider.tsx:** A wrapper that combines the i18n instance and the localization provider, enabling the context and translations for the whole app.

- **index.ts:** The main entry point for exporting all relevant functions, hooks, and providers for easy use in other projects. It includes hooks like useAppLocalizationContext and useAppTranslation.

- **react-18next.d.ts:** TypeScript declarations to extend i18next with custom translation types.

- **utils.js:** Utility functions for handling language preferences in local storage and setting the i18n language.

## Available Functions
**seti18nLanguage(lang: string):** Sets the i18n language and updates the dayjs locale.

**useAppLocalizationContext:** Provides access to the current language, the selected language preference, and a method to change the selected language.

**useAppTranslation:** A hook that returns the i18n translation function for translating keys in your app.

## Conclusion
This i18n module provides a powerful and flexible localization solution for React Native apps. It offers automatic language detection, easy-to-use context management, and seamless integration with the react-i18next library. By following the setup instructions and using the provided hooks, you can quickly localize your app for multiple languages.

