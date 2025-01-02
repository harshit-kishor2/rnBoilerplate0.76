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

Run this script from terminal -> This will create structure. After theat cerate README.md file in necessary directories.


```bash
mkdir -p src/{assets/{appIcon,fonts,gif,images,lottie,svg},components,helpers,hooks,i18n,navigation,services,store,theme,views}
```


### 2. Eslint setup and Validate commit message using lefthook

Eslint -> https://gist.github.com/harshit-kishor2/ebd41c9781e10826c09d60658f315f89

Lefthook ->  https://medium.com/@harshitkishor2/validating-commit-messages-with-lefthook-in-react-native-199085d2be40


### 3. React Native Path Aliasing

    yarn add --dev babel-plugin-module-resolver

Update `babel.config.json`

```javascript
 plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          // '@assets': './src/assets',
          // '@components': './src/components',
          "@app": "./src",
        },
      },
    ],
  ],
```

Update `tsconfig.json`

```javascript
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/*"]
    },
  }
```


# Install these helper dependencies

yarn add react-native-safe-area-context

##### 1. react-native-gesture-handler

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

##### 2. react-native-reanimated

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



### 4. Add some important packages

**svg/image/lottie/gif** -> check README.md inside `assets`

**custom fonts and react-native-vector-icon** -> check README.md inside `assets`

**local-storage** -> check README.md inside `services` directory and `localStorage.ts` file

**axios** -> check README.md inside `services` directory and `appAxios.ts` file

**localization** -> check README.md inside `i18n` directory.

**theme** -> check README.md inside `theme` directory.

**hooks** -> check README.md inside `hook` directory for custom hooks.

**navigation** -> check README.md inside `navigations` directory.

Sequence ==> assets -> theme -> services -> i18n -> helpers -> components -> hooks -> views -> navigations -> store