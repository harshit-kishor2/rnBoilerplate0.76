import {Platform, Dimensions, ScaledSize} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {isIphoneX, getStatusBarHeight, getBottomSpace} from 'react-native-iphone-screen-helper';


//=============================

// ! Screen Constants
const Screen: ScaledSize = Dimensions.get('screen');

/**
 * @description
 * The width of the screen.
 * @type {number}
 */
export const ScreenWidth: number = Screen.width;

/**
 * @description
 * The height of the screen.
 * @type {number}
 */
export const ScreenHeight: number = Screen.height;

/**
 * @description
 * The scale of the screen.
 * @type {number}
 */
export const ScreenScale: number = Screen.scale;

/**
 * @description
 * The font scale of the screen.
 * @type {number}
 */
export const ScreenFontScale: number = Screen.fontScale;

//=============================


// ! Window Constants

const Window: ScaledSize = Dimensions.get('window');

/**
 * @description
 * The width of the window.
 * @type {number}
 */
export const WindowWidth: number = Window.width;

/**
 * @description
 * The height of the window.
 * @type {number}
 */
export const WindowHeight: number = Window.height;

/**
 * @description
 * The scale of the window.
 * @type {number}
 */
export const WindowScale: number = Window.scale;

/**
 * @description
 * The font scale of the window.
 * @type {number}
 */
export const WindowFontScale: number = Window.fontScale;

//=============================


// ! Iphone related from react-native-iphone-screen-helper library
/**
 * @description
 * true if you're running on an iPhone X or a newer model with a notch or dynamic island.
 * @type {boolean}
 */
export const isIphoneXOrNewer: boolean = isIphoneX();

/**
 * @description
 * The height of the bottom to fit the safe area: 34 for iPhone X and newer models with a notch or dynamic island
 * and 0 for other devices.
 *
 */
export const bottomSpace: number = getBottomSpace();

/**
 *
 * 62 for safe iPhone 16 Pro Max
 *
 * 59 for safe iPhone 14 Pro, 14 Pro Max, 15, 15 Plus, 15 Pro, 15 Pro Max, 16, 16 Plus, 16 Pro
 *
 * 50 for safe iPhone 12 Mini, 13 Mini
 *
 * 47 for safe iPhone 12, 12 Pro, 12 Pro Max, 13, 13 Pro, 13 Pro Max, 14, 14 Plus
 *
 * 44 for safe iPhone X, Xs, Xs Max, 11 Pro, 11 Pro Max
 *
 * 8 for safe iPhone Xr, 11
 *
 * 20 for other devices
 *
 * StatusBar.currentHeight for Android.
 *
 */
export const statusBarHeight: number = getStatusBarHeight();

// ==============================

// ! Platform related
/**
 * @description
 * Determines whether the app is running on iOS.
 * @type {boolean}
 */
export const isIOS: boolean = Platform.OS === 'ios';

/**
 * @description
 * Determines whether the app is running on android.
 * @type {boolean}
 */
export const isAndroid: boolean = Platform.OS === 'android';

/**
 * @description
 * Gets the version number of the platform.
 */
export const PlatformVersion = Platform.Version;

// ==============================

// ! Device Info related from react-native-device-info

/**
 * @description
 * Checks if the device has a notch.
 * @type {boolean}
 */
export const hasNotch: boolean = DeviceInfo.hasNotch();

/**
 * @description
 * Checks if the device has a notch but not a dynamic island.
 * @type {boolean}
 */
export const hasNotchOnly: boolean = DeviceInfo.hasNotch() && !DeviceInfo.hasDynamicIsland();

/**
 * @description
 * Checks if the device has a dynamic island.
 * @type {boolean}
 */
export const hasDynamicIsland: boolean = DeviceInfo.hasDynamicIsland();


/**
 * @description
 * Checks if the device is a tablet.
 * @type {boolean}
 */
export const isTablet: boolean = DeviceInfo.isTablet();

/**
 * @description
 * The bundle identifier of the app.
 * @type {string}
 */
export const BUNDLE_ID: string = DeviceInfo.getBundleId();

/**
 * @description
 * The name of the app.
 * @type {string}
 */
export const APP_NAME: string = DeviceInfo.getApplicationName();

/**
 * @description
 * The version of the app which is set in the app's build configuration.
 * @type {string}
 */
export const BUILD_VERSION: string = DeviceInfo.getVersion();

/**
 * @description
 * The build number of the app which is set in the app's build configuration.
 * @type {string | number}
 */
export const BUILD_NUMBER: string | number = DeviceInfo.getBuildNumber();


// ==============================
/**
 * @description
 * These are the dynamic calculation for the app is on the landscape or portrait mode.
 */
export const ScreenMin = Math.min(ScreenWidth, ScreenHeight) || ScreenHeight;
export const ScreenMax = Math.max(ScreenWidth, ScreenHeight) || ScreenWidth;

/**
 * @description
 * These are the viewport units for the web or mobile web who wants to use viewport units.
 */
export const vh = ScreenHeight / 100;
export const vw = ScreenWidth / 100;
export const vmin = Math.min(vh, vw) || vh;
export const vmax = Math.max(vh, vw) || vw;
