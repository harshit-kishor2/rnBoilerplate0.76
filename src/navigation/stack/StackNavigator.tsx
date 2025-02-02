import {UserRoles} from '@app/helpers/enums';
import {useSplashTimeout} from '@app/hooks';
import {usePersistAuthStore} from '@app/store/zustand/use-auth-store';
import {
  FilterScreen,
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  WebviewScreen,
} from '@app/views';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {SCREEN_OPTIONS} from '../navigation-service';
import {RootStackParamList, RouteConst} from '../types';
import AppDrawer from '../drawer/AppDrawer';

const Stack = createStackNavigator<RootStackParamList>();

// Predefined route map for initial route determination
const roleRouteMap: Record<UserRoles, RouteConst> = {
  [UserRoles.Admin]: RouteConst.BottomTabRoute,
  [UserRoles.User]: RouteConst.MainDrawer,
  [UserRoles.Guest]: RouteConst.LoginRoute,
};

const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  const {userRole} = usePersistAuthStore();

  const handleSplashEnd = useCallback(() => {
    const effectiveRole = userRole || UserRoles.Guest;
    const initialRouteName = getInitialRouteName(effectiveRole);
    console.log(`🚀 Splash ended! Navigating to the ${initialRouteName}.`);
    setInitialRoute(initialRouteName);
  }, [userRole]);

  const isSplashEnd = useSplashTimeout(handleSplashEnd);

  // Show splash screen first, then set navigation
  if (!isSplashEnd || !initialRoute) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteConst.MainDrawer} component={AppDrawer} />

      {/* <Stack.Screen name={RouteConst.BottomTabRoute} component={BottomTabNavigator} /> */}

      {/* All Common Screens here */}
      <Stack.Group screenOptions={SCREEN_OPTIONS.stack}>
        <Stack.Screen name={RouteConst.LoginRoute} component={LoginScreen} />
        <Stack.Screen
          name={RouteConst.RegisterRoute}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={RouteConst.WebViewRoute}
          component={WebviewScreen}
        />
      </Stack.Group>

      {/* Modal-based routes */}
      <Stack.Group screenOptions={SCREEN_OPTIONS.modal}>
        <Stack.Screen name={RouteConst.FilterRoute} component={FilterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

/**
 * Determines the initial route based on the user's role
 * @param {UserRoles} userRole - The role of the user
 * @returns {keyof RootStackParamList} - The initial route name
 */
const getInitialRouteName = (userRole: UserRoles): keyof RootStackParamList => {
  if (!roleRouteMap[userRole]) {
    console.warn(
      `⚠️ Unknown user role: ${userRole}, defaulting to LoginRoute.`
    );
    return RouteConst.LoginRoute;
  }
  return roleRouteMap[userRole];
};

export default StackNavigator;
