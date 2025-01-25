### 1. Initiate project
Create folder structure to maintain clarity and ease of development. Below is an overview of the directories. Each directory contains README.md file. Check all for initial setup.

src/
  - assets/
  - components/
  - helpers/
  - hooks/
  - i18n/
  - navigation/
  - services/
  - store/
  - theme/
  - views/
  - App.tsx

Run this script from terminal -> This will create structure. After that create README.md file in necessary directories.


```bash
mkdir -p src/{assets/{appIcon,fonts,gif,images,lottie,svg},components,helpers,hooks,i18n,navigation,services,store,theme,views}
```


### 2. React Native Path Aliasing

Path Alias -> https://gist.github.com/harshit-kishor2/efb4fe80251282226eb575d39654ebda

### 3. Eslint setup and Validate commit message using lefthook

Eslint -> https://gist.github.com/harshit-kishor2/ebd41c9781e10826c09d60658f315f89

Lefthook ->  https://medium.com/@harshitkishor2/validating-commit-messages-with-lefthook-in-react-native-199085d2be40


### 4.  Install these helper dependencies

##### A. react-native-gesture-handler

```javascript
yarn add react-native-safe-area-context
```
After installation, wrap your entry point with <SafeAreaProvider>

```javascript
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      {/* content */}
    </SafeAreaProvider>
  );
}
```


##### B. react-native-gesture-handler

```javascript
yarn add react-native-gesture-handler
```

To finalize the installation of `react-native-gesture-handler`:
 1. create a directory inside root folder - `gesture-handler`
 2. conditionally import `react-native-gesture-handler` by creating two files inside `gesture-handler`

`gh.native.js`

```javascript
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
```

`gh.js`

```javascript
// Don't import react-native-gesture-handler on web
```

Add the following line at the top of your entry file, such as `index.js` or `App.js`:

```javascript
import './gesture-handler/gh';
```

After installation, wrap your entry point with <GestureHandlerRootView>

```javascript
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* content */}
    </GestureHandlerRootView>
  );
}
```

##### C. react-native-reanimated

```javascript
yarn add react-native-reanimated
```

Add the `react-native-reanimated/plugin` to your `babel.config.js`:

```javascript
module.exports = {
  presets: [
    // other presets
  ],
  plugins: [
    // other plugins
    'react-native-reanimated/plugin',
  ],
};
```

##### C. react-native-paper


   ```bash
	yarn add react-native-paper
	yarn add react-native-safe-area-context

   ```

Add the following plugin configuration to your `babel.config.js`:

```javascript
module.exports = {
  presets: [
    // other presets
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};

```
### 5. Theme setup

**theme** -> check README.md inside `theme` directory.


### 6. Localization setup

**localization** -> check README.md inside `i18n` directory.


### 7. Assest setup with vector icons

**svg/image/lottie/gif** -> check README.md inside `assets`

**custom fonts** -> check README.md inside `assets`


### 8. Navigations setup

**navigation** -> check README.md inside `navigations` directory.

### 9. Store setup

**store** -> check README.md inside `store` directory.


### 10. Add some serives files (axios, localstorage)

**local-storage** -> check README.md inside `services` directory and `localStorage.ts` file

**axios** -> check README.md inside `services` directory and `appAxios.ts` file


### 11.Useful hooks
**hooks** -> check README.md inside `hook` directory for custom hooks.


react-native-network-logger, axios-logger, fuse.js, shopify flatlist, react-hook-form
