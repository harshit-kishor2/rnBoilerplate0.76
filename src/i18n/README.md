# i18n Directory

The internationalization (i18n) setup for the application is housed in this directory. This includes language files, translation utilities, and configuration for supporting multiple languages.

### Example structure:

    i18n/
      resources/
        en.json
        es.json
        hi.json
        index.ts
      index.ts
      react-18next.d.ts

### Subfolders

#### 1. **resources**

This folder contains all language JSON files. Each JSON file corresponds to a specific language and contains key-value pairs for translated text.

#### 2. **index.ts**

This is Configuration files for i18n typically include settings for the default language, supported languages, and fallback languages. These settings ensure the application can handle multiple languages smoothly and provide fallbacks if a translation is missing.

1. Install these dependencies if not installed

   yarn add react-i18next i18next dayjs react-native-localize
   yarn add --dev @types/i18next

2. check `useAppLangauage` and `useAppTranslation` hook inside `index.ts` file
3. For import suggetions create `react-18next.d.ts` file.
4. For RTL support check this article -
   https://shiharadilshan.medium.com/rtl-right-to-left-support-with-internationalization-for-react-native-applications-7ca69e8b68e5

https://reactnative.dev/blog/2016/08/19/right-to-left-support-for-react-native-apps


Note -> language-name-map, Also check customhook and LocalizationProvider
