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

Run this script from terminal -> This will create structure that containe index.ts and Readme.md file.

```bash
mkdir -p src/{assets/{appIcon,fonts,gif,images,lottie,svg},components,helpers,hooks,i18n,navigation,services,store,theme,views} &&
for dir in src/* src/assets/*; do
  echo "export {};" > "$dir/index.ts"
  touch "$dir/README.md"
done
```


### 2. Validate commit message using lefthook

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


### 4. Add some important packages

**svg/image/lottie/gif** -> check README.md inside `assets`

**custom fonts and react-native-vector-icon** -> check README.md inside `assets`

**local-storage** -> check README.md inside `services` directory and `localStorage.ts` file

**axios** -> check README.md inside `services` directory and `appAxios.ts` file

**localization** -> check README.md inside `i18n` directory.

**theme** -> check README.md inside `theme` directory.

**hooks** -> check README.md inside `hook` directory for custom hooks.

**navigation** -> check README.md inside `navigations` directory.

assets -> theme -> services -> i18n -> helpers -> components