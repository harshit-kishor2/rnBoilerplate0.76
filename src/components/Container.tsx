import {rpWidth} from '@app/helpers/responsive';
import {useDeviceTheme} from '@app/hooks';
import {useAppTheme} from '@app/theme';
import React, {ReactNode} from 'react';
import {DimensionValue, SafeAreaView, StatusBar, StyleSheet, View, ViewStyle} from 'react-native';

interface ContainerProps {
  useSafeArea?: boolean,
  children: ReactNode,
  backgroundColor?: string,
  statusBarColor?: string,
  padding?: DimensionValue,
  paddingHorizontal?: DimensionValue,
  margin?: DimensionValue,
  style?: ViewStyle;
}
const Container: React.FC<ContainerProps> = ({
  useSafeArea = true,
  children,
  backgroundColor,
  statusBarColor,
  padding = 0,
  paddingHorizontal,
  margin = 0,
  style
}: ContainerProps) => {
  const theme = useAppTheme();
  // Get App Mode from settings
  const appTheme = useDeviceTheme();
  // Change bar style according to theme
  const barStyle = appTheme == 'dark' ? 'light-content' : 'dark-content';
  const ContainerTag = useSafeArea ? SafeAreaView : View;
  return (
    <ContainerTag style={StyleSheet.flatten([
      styles.container,
      {
        backgroundColor: backgroundColor || theme.colors.background,
        paddingHorizontal: paddingHorizontal || rpWidth(12),
        padding,
        margin,
      },
      style
    ])}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={statusBarColor || theme.colors.background}
      />
      {children}
    </ContainerTag>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  }
});