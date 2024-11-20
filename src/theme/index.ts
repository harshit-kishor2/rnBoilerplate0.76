import Assets from '@app/assets';
import {configureFonts, useTheme} from 'react-native-paper';
import {
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import {MD3Type} from 'react-native-paper/lib/typescript/types';

const ColorConst = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  gray: '#808080',
  yellow: '#FFFF00',
  transparent: 'transparent',
  lightGray: '#D3D3D3',
  darkGray: '#A9A9A9',
  orange: '#FFA500',
  purple: '#800080',
  pink: '#FFC0CB',
  brown: '#A52A2A',
};

const fontConfig: Record<string, MD3Type> = {
  regular: {
    fontFamily: Assets.font.Roboto.regular,
    letterSpacing: 1,
    fontWeight: 'normal',
    lineHeight: 16,
    fontSize: 14,
  },
  medium: {
    fontFamily: Assets.font.Roboto.medium,
    letterSpacing: 0.5,
    fontWeight: '500',
    lineHeight: 16,
    fontSize: 14,
  },
  bold: {
    fontFamily: Assets.font.Roboto.bold,
    letterSpacing: 0,
    fontWeight: 'bold',
    lineHeight: 16,
    fontSize: 14,
  },
};

const lightTheme = {
  ...MD3LightTheme,
  // Specify custom property
  themeType: 'light',
  // Specify custom property in nested object
  myRandomProperty: 'Light Mode',
  fonts: configureFonts({
    config: fontConfig
  }),
  colors: {
    ...MD3LightTheme.colors,
    ...ColorConst,
    primary: '#EF2A39',
    primaryContainer: '#FF6F6F', // Lighter variant for the primary container
    secondary: '#1c2511',
    secondaryContainer: '#C8E6C9', // Light green for secondary container
    tertiary: '#002725',
    tertiaryContainer: '#B2DFDB', // Lighter green for tertiary container
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5', // Light grey for surface variant
    surfaceDisabled: '#D1D1D1', // Disabled surface color
    background: '#FFFFFF',
    error: '#4e0002', // Error color
    errorContainer: '#FFCDD2', // Light error background
    onPrimary: '#FFFFFF', // Text color on primary
    onPrimaryContainer: '#000000', // Text color on primary container
    onSecondary: '#FFFFFF', // Text color on secondary
    onSecondaryContainer: '#000000', // Text color on secondary container
    onTertiary: '#FFFFFF', // Text color on tertiary
    onTertiaryContainer: '#000000', // Text color on tertiary container
    onSurface: '#000000', // Text color on surface
    onSurfaceVariant: '#000000', // Text color on surface variant
    onSurfaceDisabled: '#A0A0A0', // Disabled text color
    onError: '#FFFFFF', // Text color on error
    onErrorContainer: '#000000', // Text color on error container
    onBackground: '#000000', // Text color on background
    outline: '#BDBDBD', // Outline color
    outlineVariant: '#9E9E9E', // Variant outline color
    inverseSurface: '#000000', // Inverse surface color
    inverseOnSurface: '#FFFFFF', // Inverse text color on surface
    inversePrimary: '#FF6F6F', // Inverse primary color
    shadow: '#000000', // Shadow color
    scrim: '#000000', // Scrim color
    backdrop: '#000000', // Backdrop color
    accent: '#FF6F6F',
    text: '#000000',
    disabled: '#D1D1D1',
    placeholder: '#9E9E9E',
    elevation: {
      level0: 'transparent',
      level1: 'rgba(0, 0, 0, 0.1)',
      level2: 'rgba(0, 0, 0, 0.2)',
      level3: 'rgba(0, 0, 0, 0.3)',
      level4: 'rgba(0, 0, 0, 0.4)',
      level5: 'rgba(0, 0, 0, 0.5)',
    },
  },

};


const darkTheme = {
  ...MD3DarkTheme,
  themeType: 'dark',
  myRandomProperty: 'Dark Mode',
  fonts: configureFonts({
    config: fontConfig
  }),
  colors: {
    ...MD3DarkTheme.colors,
    ...ColorConst,
    primary: '#EF2A39',
    primaryContainer: '#FF6F6F', // Same as light for consistency
    secondary: '#1c2511',
    secondaryContainer: '#1F2D1A', // Darker shade for secondary container
    tertiary: '#002725',
    tertiaryContainer: '#004D4D', // Darker shade for tertiary container
    surface: '#121212',
    surfaceVariant: '#1E1E1E', // Dark grey for surface variant
    surfaceDisabled: '#666666', // Disabled surface color
    background: '#121212',
    error: '#4e0002', // Same error color
    errorContainer: '#FF6F6F', // Light error background
    onPrimary: '#FFFFFF', // Text color on primary
    onPrimaryContainer: '#000000', // Text color on primary container
    onSecondary: '#FFFFFF', // Text color on secondary
    onSecondaryContainer: '#000000', // Text color on secondary container
    onTertiary: '#FFFFFF', // Text color on tertiary
    onTertiaryContainer: '#000000', // Text color on tertiary container
    onSurface: '#FFFFFF', // Text color on surface
    onSurfaceVariant: '#FFFFFF', // Text color on surface variant
    onSurfaceDisabled: '#A0A0A0', // Disabled text color
    onError: '#FFFFFF', // Text color on error
    onErrorContainer: '#000000', // Text color on error container
    onBackground: '#FFFFFF', // Text color on background
    outline: '#BDBDBD', // Outline color
    outlineVariant: '#9E9E9E', // Variant outline color
    inverseSurface: '#FFFFFF', // Inverse surface color
    inverseOnSurface: '#000000', // Inverse text color on surface
    inversePrimary: '#FF6F6F', // Inverse primary color
    shadow: '#000000', // Shadow color
    scrim: '#000000', // Scrim color
    backdrop: '#000000', // Backdrop color
    accent: '#FF6F6F',
    text: '#FFFFFF',
    disabled: '#666666',
    placeholder: '#BDBDBD',
    elevation: {
      level0: 'transparent',
      level1: 'rgba(255, 255, 255, 0.1)',
      level2: 'rgba(255, 255, 255, 0.2)',
      level3: 'rgba(255, 255, 255, 0.3)',
      level4: 'rgba(255, 255, 255, 0.4)',
      level5: 'rgba(255, 255, 255, 0.5)',
    },
  },
};




const useAppTheme = () => {
  const theme = useTheme<AppTheme>();
  return theme;
};

export {
  ColorConst,
  useAppTheme,
  lightTheme,
  darkTheme,
};