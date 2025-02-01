import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList, RouteName} from "./types";

/**
 * Custom hook to access the navigation object for a specific screen.
 *
 * @param _screenName The name of the screen in the root stack.
 * @returns The navigation object for the specified screen.
 */
export const useAppNavigation = <T extends RouteName>(_screenName: T) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, T>>();
  return navigation;
};

/**
 * Custom hook to access the route object for a specific screen.
 *
 * @param _screenName The name of the screen in the root stack.
 * @returns The route object for the specified screen.
 */
export const useAppRoute = <T extends RouteName>(_screenName: T) => {
  const route = useRoute<RouteProp<RootStackParamList, T>>();
  return route;
};
