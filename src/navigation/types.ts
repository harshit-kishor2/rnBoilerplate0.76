import {UserRoles} from '@app/helpers/enums';
import {
  ParamListBase,
  RouteConfig,
  StackNavigationState,
} from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

export enum RouteType {
  modal = 'modal',
  stack = 'stack',
}

type CustomRouteParams = {
  type?: RouteType;
  roles?: UserRoles[];
};

export type SecureStackRouteType<ParamList extends ParamListBase> = RouteConfig<
  ParamList,
  keyof ParamList,
  StackNavigationState<ParamList>,
  StackNavigationOptions,
  StackNavigationEventMap,
  StackNavigationProp<ParamListBase, string, undefined>
> &
  CustomRouteParams;

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
