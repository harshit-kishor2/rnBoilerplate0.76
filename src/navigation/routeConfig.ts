import {
  LoginScreen,
  HomeScreen,
  NetworkLoggerScreen,
  SettingScreen,
  WebviewScreen

} from '@app/views';
import {CardStyleInterpolators, type StackNavigationOptions} from '@react-navigation/stack';

// Make changes here for global screen options in stack
export const stackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
};

// Make changes here for modal screen options in stack
export const modalScreenOptions: StackNavigationOptions = {
  presentation: 'modal',
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'vertical',
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};





// Put all Pre Auth routes and respected screen here
export const preAuthRoutes: RootStackRoutesType[] = [
  {
    name: 'LoginRoute',
    component: LoginScreen,
  }
];

// Put all Post Auth routes and respected screen here
export const postAuthRoutes: RootStackRoutesType[] = [
  {
    name: 'HomeRoute',
    component: HomeScreen,
  },
  {
    name: 'NetworkLoggerRoute',
    component: NetworkLoggerScreen,
  },
  {
    name: 'SettingRoute',
    component: SettingScreen,
  },
];

// Put all common routes and respected screen here
export const commonRoutes: RootStackRoutesType[] = [
  {
    name: 'WebViewRoute',
    component: WebviewScreen,
  },
];

// Put all Modal routes and respected screen here
export const modalRoutes: RootStackRoutesType[] = [
  // {
  //     name: 'CountryCodeRoute',
  //     component: CountryCodeScreen,
  // },
];