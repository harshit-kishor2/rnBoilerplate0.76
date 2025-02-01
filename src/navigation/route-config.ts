import {
  LoginScreen,
  HomeScreen,
  NetworkLoggerScreen,
  SettingScreen,
  WebviewScreen,
  RegisterScreen,
} from "@app/views";
import {
  CardStyleInterpolators,
  type StackNavigationOptions,
} from "@react-navigation/stack";

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

export const allRoutes: RootStackRoutesType[] = [
  {
    name: "RegisterRoute",
    component: RegisterScreen,
    type: "stack",
    role: ["guest"],
  },
  {
    name: "LoginRoute",
    component: LoginScreen,
    type: "stack",
    role: ["guest"],
  },
  {
    name: "NetworkLoggerRoute",
    component: NetworkLoggerScreen,
    type: "stack",
    role: ["user", "admin"],
  },
  {
    name: "HomeRoute",
    component: HomeScreen,
    type: "stack",
    role: ["user"],
  },
  {
    name: "SettingRoute",
    component: SettingScreen,
    type: "stack",
    role: ["user", "admin"],
  },
  {
    name: "WebViewRoute",
    component: WebviewScreen,
    type: "stack",
    role: ["guest", "user", "admin"],
  },

  // {
  //   name: 'CountryCodeRoute',
  //   component: CountryCodeScreen,
  //   type: "modal",
  //   role: ["guest", "user", "admin"],
  // },
];
