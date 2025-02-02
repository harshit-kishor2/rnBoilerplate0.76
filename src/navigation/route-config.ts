import {UserRoles} from '@app/helpers/enums';
import {
  HomeScreen,
  LoginScreen,
  NetworkLoggerScreen,
  RegisterScreen,
  SettingScreen,
  WebviewScreen,
} from '@app/views';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  RootStackParamList,
  RouteConst,
  RouteType,
  SecureStackRouteType,
} from './types';

// Global screen options for stack and modal navigation
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

// Define all application routes with associated roles for access control
export const allRoutes: SecureStackRouteType<RootStackParamList>[] = [
  {
    name: RouteConst.RegisterRoute,
    component: RegisterScreen,
    type: RouteType.stack,
    roles: [UserRoles.Guest], // Accessible only to guest users
  },
  {
    name: RouteConst.LoginRoute,
    component: LoginScreen,
    type: RouteType.stack,
    roles: [UserRoles.Guest], // Accessible only to guest users
  },
  {
    name: RouteConst.NetworkLoggerRoute,
    component: NetworkLoggerScreen,
    type: RouteType.stack,
    roles: [UserRoles.User, UserRoles.Admin], // Accessible to users and admins
  },
  {
    name: RouteConst.HomeRoute,
    component: HomeScreen,
    type: RouteType.stack,
    roles: [UserRoles.User], // Accessible only to regular users
  },
  {
    name: RouteConst.SettingRoute,
    component: SettingScreen,
    type: RouteType.stack,
    roles: [UserRoles.User, UserRoles.Admin], // Accessible to users and admins
  },
  {
    name: RouteConst.WebViewRoute,
    component: WebviewScreen,
    type: RouteType.stack, // No role restriction, accessible to all users
  },

  // Example of a modal route (commented out for now)
  // {
  //   name: 'CountryCodeRoute',
  //   component: CountryCodeScreen,
  //   type: RouteType.modal,
  //   roles: [UserRoles.Guest, UserRoles.User, UserRoles.Admin],
  // },
];

/**
 * Returns a filtered array of routes that the user with the specified role is allowed to access.
 * Includes routes without a `roles` property, which are considered public.
 * @param {UserRoles} role The role to filter routes by.
 * @return {Array<RouteConfig>} An array of route configurations.
 */
export const filterRoutesByRole = (role: UserRoles) => {
  return allRoutes.filter(
    route =>
      !route.roles || // Include role-less routes
      route.roles.includes(role)
  ); // Include routes with matching role
};
