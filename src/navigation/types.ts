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

type CustomRouteParams = {
  type?: "modal" | "stack";
  roles?: IUserRole[];
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

//  All Screen Route
export type RootStackParamList = {
  SplashRoute: undefined;
  WebViewRoute:
    | {webUrl?: string; from?: keyof RootStackParamList; page?: IWebViewPages}
    | undefined;
  BottomTabRoute: {from?: keyof RootStackParamList} | undefined;
  LoginRoute: {from?: keyof RootStackParamList} | undefined;
  RegisterRoute: {from?: keyof RootStackParamList} | undefined;
  HomeRoute: {from?: keyof RootStackParamList} | undefined;
  NetworkLoggerRoute: {from?: keyof RootStackParamList} | undefined;
  SettingRoute: {from?: keyof RootStackParamList} | undefined;
};
