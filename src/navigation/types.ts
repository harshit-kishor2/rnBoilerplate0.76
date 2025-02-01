import {UserRoles} from "@app/helpers/enums";
import {
  ParamListBase,
  RouteConfig,
  StackNavigationState,
} from "@react-navigation/native";
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";

export enum RouteType {
  modal = "modal",
  stack = "stack",
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

export type RouteName = keyof RootStackParamList;

export enum RouteConst {
  SplashRoute = "SplashRoute",
  LoginRoute = "LoginRoute",
  RegisterRoute = "RegisterRoute",
  HomeRoute = "HomeRoute",
  BottomTabRoute = "BottomTabRoute",
  NetworkLoggerRoute = "NetworkLoggerRoute",
  SettingRoute = "SettingRoute",
  WebViewRoute = "WebViewRoute",
  // Add all other routes here
}

//  All Screen Route
export type RootStackParamList = {
  [RouteConst.SplashRoute]: undefined;
  [RouteConst.WebViewRoute]:
    | {webUrl?: string; from?: keyof RootStackParamList; page?: IWebViewPages}
    | undefined;
  [RouteConst.BottomTabRoute]: {from?: keyof RootStackParamList} | undefined;
  [RouteConst.LoginRoute]: {from?: keyof RootStackParamList} | undefined;
  [RouteConst.RegisterRoute]: {from?: keyof RootStackParamList} | undefined;
  [RouteConst.HomeRoute]: {from?: keyof RootStackParamList} | undefined;
  [RouteConst.NetworkLoggerRoute]:
    | {from?: keyof RootStackParamList}
    | undefined;
  [RouteConst.SettingRoute]: {from?: keyof RootStackParamList} | undefined;
};
