import {useSplashTimeout} from "@app/hooks";
import {usePersistAuthStore} from "@app/store/zustand/use-auth-store";
import {SplashScreen} from "@app/views";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useCallback, useMemo, useState} from "react";
import {
  allRoutes,
  modalScreenOptions,
  stackScreenOptions,
} from "./route-config";
import {UserRoles} from "@app/helpers/enums";
import {RouteConst, RouteName, RouteType} from "./types";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<RouteName | null>(null);

  const {isAuth, userRole} = usePersistAuthStore();

  const handleSplashEnd = useCallback(() => {
    console.log("Splash ended! Navigating to the next screen.");
    setInitialRoute(getInitialRouteName(isAuth, userRole));
  }, [isAuth, userRole]);

  const isSplashEnd = useSplashTimeout(handleSplashEnd);

  // Memoize filtered routes to prevent unnecessary re-renders
  const {stackRoutes, modalRoutes} = useMemo(() => {
    const filteredRoutes = allRoutes.filter(
      route => route.roles?.includes(userRole) ?? true // Allow routes without roles
    );

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
      <Stack.Group screenOptions={stackScreenOptions}>
        {stackRoutes.map(({name, component, options}) => {
          // Check if component is valid before passing it
          if (!component) {
            console.error(`Missing component for route: ${name.toString()}`);
            return null;
          }
          return (
            <Stack.Screen
              key={name.toString()}
              name={name}
              component={component}
              options={options}
            />
          );
        })}
      </Stack.Group>

      {/* Modal-based routes */}
      <Stack.Group screenOptions={modalScreenOptions}>
        {modalRoutes.map(({name, component, options}) => {
          // Check if component is valid before passing it
          if (!component) {
            console.error(`Missing component for route: ${name.toString()}`);
            return null;
          }
          return (
            <Stack.Screen
              key={name.toString()}
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

// Helper function for initial route determination
const getInitialRouteName = (
  isAuth: boolean,
  userRole: UserRoles
): RouteName => {
  if (!isAuth) return RouteConst.LoginRoute;

  return userRole === UserRoles.Admin
    ? RouteConst.BottomTabRoute
    : RouteConst.HomeRoute;
};

// Validate only in development environment
if (__DEV__) {
  try {
    const uniqueNames = new Set(allRoutes.map(r => r.name));
    if (uniqueNames.size !== allRoutes.length) {
      const duplicates = allRoutes
        .map(r => r.name)
        .filter((name, index, arr) => arr.indexOf(name) !== index);

      throw new Error(
        `Duplicate route names detected: ${duplicates.join(", ")}`
      );
    }

    // Ensure all routes have valid components
    allRoutes.forEach(route => {
      if (!route.component) {
        throw new Error(`Route ${route.name} is missing a component`);
      }
    });

    // Validate route types
    const validTypes = [RouteType.modal, RouteType.stack];
    allRoutes.forEach(route => {
      if (route.type && !validTypes.includes(route.type)) {
        throw new Error(`Invalid type '${route.type}' for route ${route.name}`);
      }
    });

    // Validate role configurations
    const validRoles = [UserRoles.Guest, UserRoles.User, UserRoles.Admin];
    allRoutes.forEach(route => {
      if (route.roles) {
        route.roles.forEach(role => {
          if (!validRoles.includes(role)) {
            throw new Error(`Invalid role '${role}' in route ${route.name}`);
          }
        });
      }
    });
    console.log("All available routes:", JSON.stringify(allRoutes));
  } catch (error) {
    console.error("Route configuration error:", {error});
    // Optional: Crash the app in development to force fixing the issue
    throw error;
  }
}

export default StackNavigator;
