import {Platform, Dimensions, NativeModules, StatusBar} from 'react-native';



const DEFAULT_STATUSBAR_HEIGHT = 30;

// iPhone X Family
const iPhoneX_HEIGHT = 812;
const iPhoneXsMax_HEIGHT = 896;
const iPhoneSE_HEIGHT = 568;
const iPhone11Pro_HEIGHT = 812;
const iPhone11ProMax_HEIGHT = 896;
const iPhone12ProMax_HEIGHT = 926;
const iPhone12Mini_HEIGHT = 812;
const iPhone14_HEIGHT = 844;
const iPhone14Plus_HEIGHT = 926;
const iPhone14Pro_HEIGHT = 852;
const iPhone14ProMax_HEIGHT = 932;

// ! Detect device language
// i.e: en_US
const getDeviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;



// ! Screen Constants
const Screen = Dimensions.get('screen');
const ScreenWidth: number = Screen.width;
const ScreenHeight: number = Screen.height;
const ScreenScale: number = Screen.scale;
const ScreenFontScale: number = Screen.fontScale;

// ! Window Constants
const Window = Dimensions.get('window');
const WindowWidth: number = Window.width;
const WindowHeight: number = Window.height;
const WindowFontScale: number = Window.fontScale;
const WindowScale: number = Window.scale;

// ! Plateform related
const isIOS: boolean = Platform.OS === 'ios';
const isAndroid: boolean = Platform.OS === 'android';
const PlatformVersion = Platform.Version;



// ! IPhone informations
const isIPhoneSE = WindowHeight === iPhoneSE_HEIGHT;
const isIPhoneX = WindowHeight === iPhoneX_HEIGHT;
const isIPhoneXsMax = WindowHeight === iPhoneXsMax_HEIGHT;

const isIPhone11Pro = WindowHeight === iPhone11Pro_HEIGHT;
const isIPhone11ProMax =
  WindowHeight === iPhone11ProMax_HEIGHT;

const isIPhone12ProMax =
  WindowHeight === iPhone12ProMax_HEIGHT;
const isIPhone12Mini = WindowHeight === iPhone12Mini_HEIGHT;

const isIPhone14 = WindowHeight === iPhone14_HEIGHT;
const isIPhone14Plus = WindowHeight === iPhone14Plus_HEIGHT;
const isIPhone14Pro = WindowHeight === iPhone14Pro_HEIGHT;
const isIPhone14ProMax =
  WindowHeight === iPhone14ProMax_HEIGHT;

const hasNotch = Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTV &&
  (isIPhone14 ||
    isIPhone14Pro ||
    isIPhone14ProMax ||
    isIPhone14Plus ||
    isIPhone12ProMax ||
    isIPhone12Mini ||
    isIPhone11ProMax ||
    isIPhone11Pro ||
    isIPhoneSE ||
    isIPhoneX ||
    isIPhoneXsMax);

const hasNotchOnly = Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTV &&
  (isIPhone14Plus ||
    isIPhone14 ||
    isIPhone12ProMax ||
    isIPhone12Mini ||
    isIPhone11ProMax ||
    isIPhone11Pro ||
    isIPhoneXsMax ||
    isIPhoneSE ||
    isIPhoneX);

const hasDynamicIsland = Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTV &&
  (isIPhone14Pro || isIPhone14ProMax);


const getStatusBarHeight = Platform.select({
  ios: hasNotch ? 44 : DEFAULT_STATUSBAR_HEIGHT,
  android: StatusBar.currentHeight || DEFAULT_STATUSBAR_HEIGHT,
}) || DEFAULT_STATUSBAR_HEIGHT;



/**
 * @description
 * These are the dynamic calculation for the app is on the landscape or portrait mode.
 */
const ScreenMin = Math.min(ScreenWidth, ScreenHeight) || ScreenHeight;
const ScreenMax = Math.max(ScreenWidth, ScreenHeight) || ScreenWidth;

/**
 * @description
 * These are the viewport units for the web or mobile web who wants to use viewport units.
 */
const vh = ScreenHeight / 100;
const vw = ScreenWidth / 100;
const vmin = Math.min(vh, vw) || vh;
const vmax = Math.max(vh, vw) || vw;

export const getDeviceInfo = () => {
  return {
    vh,
    vw,
    vmin,
    vmax,
    ScreenMin,
    ScreenMax,
    isIOS,
    isAndroid,
    ScreenWidth,
    ScreenHeight,
    ScreenScale,
    ScreenFontScale,
    WindowWidth,
    WindowHeight,
    WindowScale,
    WindowFontScale,
    PlatformVersion,
    getDeviceLanguage,
    getStatusBarHeight,
    hasNotch,
    hasNotchOnly,
    hasDynamicIsland
  };
};


// Figma==> 375, 812 -> (4 of 5)
// Device==>
// Emulator ==> Pixel5 API30
// {
//     "PlatformVersion": 30,
//     "ScreenFontScale": 1,
//     "ScreenHeight": 850.9090909090909,
//     "ScreenMax": 850.9090909090909,
//     "ScreenMin": 392.72727272727275,
//     "ScreenScale (Pixel Ratio)": 2.75,
//     "ScreenWidth": 392.72727272727275,
//     "WindowFontScale": 1,
//     "WindowHeight": 802.9090909090909,
//     "WindowScale": 2.75,
//     "WindowWidth": 392.72727272727275,
//     "getDeviceLanguage": "en_IN",
//     "getStatusBarHeight": 24,
//     "hasDynamicIsland": false,
//     "hasNotch": false,
//     "hasNotchOnly": false,
//     "isAndroid": true,
//     "isIOS": false,
//     "vh": 8.509090909090908,
//     "vmax": 8.509090909090908,
//     "vmin": 3.9272727272727277,
//     "vw": 3.9272727272727277
//   }