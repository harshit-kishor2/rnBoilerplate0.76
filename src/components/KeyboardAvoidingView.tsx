import React from "react";
import {StyleSheet} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

interface IKeyboardAvoidingWrapperProps {
  children: React.ReactNode;
  style?: object;
  contentContainerStyle?: object;
  extraHeight?: number; // To adjust height when the keyboard is visible
  extraScrollHeight?: number; // To scroll more when inputs are hidden
}

const KeyboardAvoidingWrapper: React.FC<IKeyboardAvoidingWrapperProps> = ({
  children,
  style,
  contentContainerStyle,
  extraHeight = 60,
  extraScrollHeight = 20,
}) => {
  return (
    <KeyboardAwareScrollView
      style={[styles.container, style]}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      extraHeight={extraHeight}
      extraScrollHeight={extraScrollHeight}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled">
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardAvoidingWrapper;
