# Theme

This folder contains the theme settings and styles for the application using React Native Paper. It defines the color scheme, typography, and other design elements that ensure a consistent and visually appealing user interface across the app. The theme settings can be customized and extended as needed to match the branding and design requirements.

**1. Install required dependencies**

```javascript
yarn add react-native-paper
yarn add react-native-safe-area-context
```

2. Update `babel.config.js` file

```javascript
module.exports = {
  presets: [
    // presets..
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
```

3. To support custom themes, paper exports a `PaperProvider` component. You need to wrap your root component with the provider to be able to support themes. If you have another provider (such as Redux), wrap it outside PaperProvider so that the context is available to components rendered inside a Modal from the library

# Install these helper dependencies

##### 1. react-native-gesture-handler

```javascript
yarn add react-native-gesture-handler
```

To finalize the installation of `react-native-gesture-handler`, conditionally import it by creating two files:

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
import './gesture-handler';
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


Note > Also check useDeviceTheme hook inside hook directory