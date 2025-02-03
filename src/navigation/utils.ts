import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

export const SCREEN_OPTIONS = {
  stack: {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  } as StackNavigationOptions,
  modal: {
    presentation: 'modal',
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: 'vertical',
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  } as StackNavigationOptions,
};

export enum RouteConst {
  LoginRoute = 'LoginRoute',
  RegisterRoute = 'RegisterRoute',

  MainDrawer = 'MainDrawer',
  BottomTabRoute = 'BottomTabRoute',

  HomeTab = 'HomeTab',
  HomeRoute = 'HomeRoute',

  SettingTab = 'SettingTab',
  SettingRoute = 'SettingRoute',

  ProfileTab = 'ProfileTab',
  ProfileRoute = 'ProfileRoute',

  NetworkLoggerRoute = 'NetworkLoggerRoute',

  // Common routes
  WebViewRoute = 'WebViewRoute',

  // Add modal routes here
  FilterRoute = 'FilterRoute',

  // Add all other routes here
}

//  All Screen Route
export type RootStackParamList = {
  [RouteConst.LoginRoute]: {from?: keyof RootStackParamList} | undefined;
  [RouteConst.RegisterRoute]: {from?: keyof RootStackParamList} | undefined;

  [RouteConst.MainDrawer]: undefined;
  [RouteConst.BottomTabRoute]: {from?: keyof RootStackParamList} | undefined;

  [RouteConst.HomeTab]: undefined;
  [RouteConst.HomeRoute]: {from?: keyof RootStackParamList} | undefined;

  [RouteConst.SettingTab]: undefined;
  [RouteConst.SettingRoute]: {from?: keyof RootStackParamList} | undefined;

  [RouteConst.ProfileTab]: undefined;
  [RouteConst.ProfileRoute]: {from?: keyof RootStackParamList} | undefined;

  [RouteConst.NetworkLoggerRoute]:
    | {from?: keyof RootStackParamList}
    | undefined;

  // Common routes
  [RouteConst.WebViewRoute]:
    | {webUrl?: string; from?: keyof RootStackParamList; page?: IWebViewPages}
    | undefined;

  // Add modal routes here
  [RouteConst.FilterRoute]: {from?: keyof RootStackParamList} | undefined;
};
