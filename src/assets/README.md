# Assets

This folder contains all static assets for the project such as images, fonts, icons, and any other media files. Organize the assets in subfolders for easier access and management.

### Subfolders:

1. #### **appIcon** -

This subfolder contains the application's icons. These icons are used for the app's launcher icon, notification icons, and any other icons that represent the app.

To generate the app icon, add the following script in `package.json`:

```sh
 "app-icon": "npx rn-ml appicon -s src/assets/appIcon/app.png",
```

And then run the following script:

```sh
npm run app-icon
```

2. #### **fonts** -

This subfolder contains all custom font files used in the application. Ensure to include the font files in various formats (e.g., .ttf, .otf) for compatibility across different platforms.

**Add Custom Fonts And Vector Icons**

```javascript
yarn add react-native-vector-icons
yarn add -D @types/react-native-vector-icons
```

Check here for react native vector icon installation guide
https://github.com/oblador/react-native-vector-icons#installation

Check here for custom fonts installation
https://medium.com/@harshitkishor2/harnessing-custom-fonts-in-your-react-native-project-5ae98fbaa98c


Add this file in root directory -` react-native.config.js`

    module.exports = {
        project: {
            ios: {},
            android: {}, // grouped into "project"
        },
        assets: ["./src/assets/fonts/"], // stays the same
        dependencies: {
            'react-native-vector-icons': {
                platforms: {
                    ios: null,
                },
            },
        },
    };

then run `npx react-native-asset` for linking custom fonts.

3. #### **images** -

This subfolder contains image files used in the application. Organize images into further subfolders if needed (e.g., backgrounds, logos, buttons).

For Images and gif we use `react-native-fast-image` where beneficial, enhancing performance especially with larger images or gifs

```javascript
yarn add react-native-fast-image
```

4. #### **lottie**

This subfolder contains Lottie animation files (.json) and GIF files. These animations can be used to add dynamic and visually appealing effects to the app.

For Lottie files we use `lottie-react-native`

    yarn add lottie-react-native

Use Custom Component For better performance created under component folder.

5. #### **svg**

This subfolder contains SVG files. SVG (Scalable Vector Graphics) files are used for vector images that can scale without losing quality.

**Svg Installation - **

    yarn add react-native-svg
    yarn add -D react-native-svg-transformer

`Update metro.config.js`

```javascript
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
```

If you are using TypeScript, you need to add this to your declarations.d.ts file (create one if you don't have one already):

```javascript
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

### Example structure:

    assets/
      appIcon/
        app.png
      fonts/
        Handlee-Regular.ttf
      images/
        person.png
        backgrounds/
          background1.png
      lottie/
        congrats.json
        loading.gif
      svg/
        login.svg

### How to Use

All assets are imported through the `index.ts` file for better management and cleaner imports across the project. Here is how to structure and use the `index.ts` file for importing assets:

#### `index.ts` File Structure

Create an `index.ts` file inside the `assets` folder and export all assets from it:

```typescript

// Import all assets files here
import GIFS from './gif';
import IMAGES from './images';
import LOTTIES from './lottie';
import {SVGIcons} from './svg';

// Import all Fonts  from here
const FontConst = {
  Roboto: {
    light: 'Roboto-Light',
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
  Satoshi: {
    light: 'Satoshi-Light',
    regular: 'Satoshi-Regular',
    medium: 'Satoshi-Medium',
    bold: 'Satoshi-Bold',
  },
};

// Consolidated export for easier access
const Assets = {
  font: FontConst,
  lottie: LOTTIES,
  gif: GIFS,
  image: IMAGES,
  svg: SVGIcons,
};

export default Assets;
```

Note -> We have created a script to auto-generate imports using a Yarn command. To use this script, you need to install the inquirer package.
```bash
yarn add -D inquirer
```
Write this script inside your package.json
```bash
"assets": "cd scripts && node generateAssets.js",
```
and then run
```bash
yarn assets
```
