### copy these folders
gesture-handler, githook, scripts, src, types 

### Replace these files
.eslintignore
.eslintrc.js
.prettierrc.js
babel.config.js
index.js
metro.config.js
tsconfig.json
lefthook.yml
react-native.config.js
MainActivity.kt

```bash
yarn add react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-paper react-i18next i18next dayjs react-native-localize react-native-mmkv react-native-vector-icons react-native-fast-image lottie-react-native react-native-svg @react-navigation/native react-native-screens @react-navigation/stack @react-native-masked-view/masked-view @react-navigation/drawer @react-navigation/bottom-tabs zustand react-native-exception-handler react-native-restart react-native-network-logger react-native-keyboard-aware-scroll-view react-native-webview react-hook-form zod @hookform/resolvers react-native-toast-message react-native-modal @shopify/flash-list react-native-device-info react-native-iphone-screen-helper react-native-size-matters react-native-responsive-fontsize @react-native-community/netinfo @reduxjs/toolkit redux-persist react-redux
```

```bash
yarn add --dev babel-plugin-module-resolver @evilmartians/lefthook @types/i18next @types/react-native-vector-icons react-native-svg-transformer inquirer
```

### Update there scripts inside package.json
```shell

"android": "react-native run-android",
"ios": "react-native run-ios",
"start": "react-native start",
"start:reset": "yarn start -- --reset-cache",
"node:reset": "rm -rf node_modules/ && yarn cache clean && watchman watch-del-all && yarn install && cd ios && pod install && cd ..",
"ios:clean": "cd ios && rm -rf ~/Library/Caches/CocoaPods && rm -rf Pods && rm -rf ~/Library/Developer/Xcode/DerivedData/\* && cd ..",
"android:dev": "react-native run-android --mode=devdebug --appIdSuffix 'dev'",
"android:dev:release": "react-native run-android --mode=devrelease --appIdSuffix 'dev'",
"android:dev:apk": "cd android && ./gradlew assembleDevRelease && cd ..",
"android:dev:aab": "cd android && ./gradlew bundleDevRelease && cd ..",
"android:prod": "react-native run-android --mode=proddebug",
"android:prod:release": "react-native run-android --mode=prodrelease",
"android:prod:apk": "cd android && ./gradlew assembleProdRelease && cd ..",
"android:prod:aab": "cd android && ./gradlew bundleProdRelease && cd ..",
"android:open": "open ./android/app/build/outputs/",
"android:remove:assets": "rm -rf android/app/src/main/res/drawable-hdpi && rm -rf android/app/src/main/res/drawable-mdpi && rm -rf android/app/src/main/res/drawable-xhdpi && rm -rf android/app/src/main/res/drawable-xxhdpi && rm -rf android/app/src/main/res/drawable-xxxhdpi",
"android:bundle": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/",
"ios:bundle": "react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios' --assets-dest ios",
"pod": "cd ios && pod install && cd ..",
"pod-new": "cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install",
"ios:dev": "react-native run-ios --mode=Debug --scheme \"rn_poc-dev\"",
"ios:prod": "react-native run-ios --mode=Debug --scheme \"rn_poc\"",
"lint": "eslint .",
"test": "jest",
"app-icon": "npx rn-ml appicon -s src/assets/appIcon/app.png",
"android:sha": "cd android && ./gradlew signingReport && cd ..",
"devices": "xcrun xctrace list devices && adb devices",
"tcp": "adb reverse tcp:8081 tcp:8081",
"format": "prettier --write .",
"screens": "cd scripts && node generateScreen.js",
"assets": "cd scripts && node generateAssets.js",
"refresh": "bash ./scripts/refresh.sh",
"link-assets": "npx react-native-asset"
```
