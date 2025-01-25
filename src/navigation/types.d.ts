import type {
  RouteConfig,
  DefaultNavigatorOptions,
  ParamListBase,
  StackNavigationState,
} from '@react-navigation/core';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
} from '@react-navigation/stack';

declare global {

  type NavigateProps = {
    fromRouteName: keyof RootStackParamList,
    routeName: keyof RootStackParamList,
    params?: ObjParams;
  };

  type StackRoutesType<ParamList extends ParamListBase> =
    RouteConfig<
      ParamList,
      keyof ParamList,
      StackNavigationState<ParamListBase>,
      StackNavigationOptions,
      StackNavigationEventMap
    >;

  // generic typing for stack navigator options
  type StackNavigatorOptions<ParamList extends ParamListBase> =
    DefaultNavigatorOptions<
      ParamList,
      StackNavigationState<ParamListBase>,
      StackNavigationOptions,
      StackNavigationEventMap
    >;

  type RootStackRoutesType = StackRoutesType<RootStackParamList>;

  //  All Screen Route
  type RootStackParamList = {
    SplashRoute: undefined;
    WebViewRoute: {webUrl?: string, from?: keyof RootStackParamList, page?: string;} | undefined;
    BottomTabRoute: {from?: keyof RootStackParamList;} | undefined;
    LoginRoute: {from?: keyof RootStackParamList;} | undefined;
    HomeRoute: {from?: keyof RootStackParamList;} | undefined;
    NetworkLoggerRoute: {from?: keyof RootStackParamList;} | undefined;
    SettingRoute: {from?: keyof RootStackParamList;} | undefined;
  };

}