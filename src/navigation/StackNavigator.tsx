import {useSplashTimeout} from '@app/hooks';
import {usePersistAuthStore} from '@app/store/zustand/use-auth-store';
import {SplashScreen} from '@app/views';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useMemo, useState} from 'react';
import {allRoutes, filterRoutesByRole, SCREEN_OPTIONS} from './route-config';
import {UserRoles} from '@app/helpers/enums';
import {RootStackParamList, RouteConst, RouteType} from './types';

const Stack = createStackNavigator<RootStackParamList>();

// Predefined route map for initial route determination
const roleRouteMap: Record<UserRoles, RouteConst> = {
  [UserRoles.Admin]: RouteConst.BottomTabRoute,
  [UserRoles.User]: RouteConst.HomeRoute,
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

  // Memoize filtered routes to prevent unnecessary re-renders
  const {stackRoutes, modalRoutes} = useMemo(() => {
    const filteredRoutes = filterRoutesByRole(userRole);
    return {
      stackRoutes: filteredRoutes.filter(
        route => route.type === RouteType.stack
      ),
      modalRoutes: filteredRoutes.filter(
        route => route.type === RouteType.modal
      ),
    };
  }, [userRole]);

  // Show splash screen first, then set navigation
  if (!isSplashEnd || !initialRoute) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}>
      {/* Stack-based routes */}
      <Stack.Group screenOptions={SCREEN_OPTIONS.stack}>
        {stackRoutes.map(({name, component, options}) => {
          // Check if component is valid before passing it
          if (!component) {
            console.error(`Missing component for route: ${name}`);
            return null;
          }
          return (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={options}
            />
          );
        })}
      </Stack.Group>

      {/* Modal-based routes */}
      <Stack.Group screenOptions={SCREEN_OPTIONS.modal}>
        {modalRoutes.map(({name, component, options}) => {
          // Check if component is valid before passing it
          if (!component) {
            console.error(`Missing component for route: ${name}`);
            return null;
          }
          return (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={options}
            />
          );
        })}
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

// **🔹 Runtime Route Validations (Development Only)**
if (__DEV__) {
  try {
    const validTypes = [RouteType.modal, RouteType.stack];
    const validRoles = [UserRoles.Guest, UserRoles.User, UserRoles.Admin];
    const seenNames = new Set();

    // Ensure all routes have valid properties
    allRoutes.forEach(route => {
      if (!route.component) {
        throw new Error(`Route ${route.name} is missing a component`);
      }
      // Validate unique route names
      if (seenNames.has(route.name)) {
        throw new Error(`Duplicate route name: ${route.name}`);
      }
      seenNames.add(route.name);

      if (route.type && !validTypes.includes(route.type)) {
        throw new Error(`Invalid type '${route.type}' for route ${route.name}`);
      }
      if (route.roles) {
        route.roles.forEach(role => {
          if (!validRoles.includes(role)) {
            throw new Error(`Invalid role '${role}' in route ${route.name}`);
          }
        });
      }
    });
    console.log('✅ Route configuration validated successfully');
    // console.log(JSON.stringify(allRoutes, null, 2))
  } catch (error) {
    console.error('❌ Route configuration error:', error);
    // Optional: Crash the app in development to force fixing the issue
    throw error;
  }
}

export default StackNavigator;
