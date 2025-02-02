/**
 * @format
 */

import "./gesture-handler/gh";
import {AppRegistry, Text, TextInput} from "react-native";
import App from "./src/App";
import {name as appName} from "./app.json";

// Override Text scaling
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}
AppRegistry.registerComponent(appName, () => App);
