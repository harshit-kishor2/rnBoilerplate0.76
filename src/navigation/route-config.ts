import {UserRoles} from "@app/helpers/enums";
import {
  HomeScreen,
  LoginScreen,
  NetworkLoggerScreen,
  RegisterScreen,
  SettingScreen,
  WebviewScreen,
} from "@app/views";
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  RootStackParamList,
  RouteConst,
  RouteType,
  SecureStackRouteType,
} from "./types";

// Make changes here for global screen options in stack and modal
export const SCREEN_OPTIONS = {
  stack: {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  } as StackNavigationOptions,
  modal: {
    presentation: "modal",
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "vertical",
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  } as StackNavigationOptions,
};

export const allRoutes: SecureStackRouteType<RootStackParamList>[] = [
  {
    name: RouteConst.RegisterRoute,
    component: RegisterScreen,
    type: RouteType.stack,
    roles: [UserRoles.Guest],
  },
  {
    name: RouteConst.LoginRoute,
    component: LoginScreen,
    type: RouteType.stack,
    roles: [UserRoles.Guest],
  },
  {
    name: RouteConst.NetworkLoggerRoute,
    component: NetworkLoggerScreen,
    type: RouteType.stack,
    roles: [UserRoles.User, UserRoles.Admin],
  },
  {
    name: RouteConst.HomeRoute,
    component: HomeScreen,
    type: RouteType.stack,
    roles: [UserRoles.User],
  },
  {
    name: RouteConst.SettingRoute,
    component: SettingScreen,
    type: RouteType.stack,
    roles: [UserRoles.User, UserRoles.Admin],
  },
  {
    name: RouteConst.WebViewRoute,
    component: WebviewScreen,
    type: RouteType.stack,
  },

  // {
  //   name: 'CountryCodeRoute',
  //   component: CountryCodeScreen,
  //   type: RouteType.modal,
  //   roles: [UserRoles.Guest, UserRoles.User, UserRoles.Admin],
  // },
];

export const filterRoutesByRole = (role: UserRoles) => {
  return allRoutes.filter(
    route =>
      !route.roles || // Include role-less routes
      route.roles.includes(role)
  ); // Include routes with matching role
};
