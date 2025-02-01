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
  type StackNavigationOptions,
} from "@react-navigation/stack";
import {RootStackParamList, SecureStackRouteType} from "./types";

// Make changes here for global screen options in stack
export const stackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

// Make changes here for modal screen options in stack
export const modalScreenOptions: StackNavigationOptions = {
  presentation: "modal",
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: "vertical",
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export const allRoutes: SecureStackRouteType<RootStackParamList>[] = [
  {
    name: "RegisterRoute",
    component: RegisterScreen,
    type: "stack",
    roles: ["guest"],
  },
  {
    name: "LoginRoute",
    component: LoginScreen,
    type: "stack",
    roles: ["guest"],
  },
  {
    name: "NetworkLoggerRoute",
    component: NetworkLoggerScreen,
    type: "stack",
    roles: ["user", "admin"],
  },
  {
    name: "HomeRoute",
    component: HomeScreen,
    type: "stack",
    roles: ["user"],
  },
  {
    name: "SettingRoute",
    component: SettingScreen,
    type: "stack",
    roles: ["user", "admin"],
  },
  {
    name: "WebViewRoute",
    component: WebviewScreen,
    type: "stack",
  },

  // {
  //   name: 'CountryCodeRoute',
  //   component: CountryCodeScreen,
  //   type: "modal",
  //   roles: ["guest", "user", "admin"],
  // },
];
