import {useSplashTimeout} from "@app/hooks";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useMemo, useState} from "react";
import {
  allRoutes,
  modalScreenOptions,
  stackScreenOptions,
} from "./route-config";
import {usePersistAuthStore} from "@app/store/zustand/use-auth-store";
import {SplashScreen} from "@app/views";
import {RootStackParamList} from "./types";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  const {isAuth, userRole} = usePersistAuthStore();

  const isSplashEnd = useSplashTimeout(() => {
    console.log("Splash ended! Navigating to the next screen.");
    // Determine initial route based on user role
    const routeName = getInitialRouteName(isAuth, userRole);
    setInitialRoute(routeName);
  });

  // Memoize filtered routes to prevent unnecessary re-renders
  const {stackRoutes, modalRoutes} = useMemo(() => {
    const filteredRoutes = allRoutes.filter(
      route => route.roles?.includes(userRole) ?? true // Allow routes without roles
    );

    return {
      stackRoutes: filteredRoutes.filter(route => route.type === "stack"),
      modalRoutes: filteredRoutes.filter(route => route.type === "modal"),
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
          if (!component) return null;
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
          if (!component) return null;
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
  userRole: IUserRole
): keyof RootStackParamList => {
  if (!isAuth) return "LoginRoute";

  return userRole === "admin" ? "BottomTabRoute" : "HomeRoute";
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
    const validTypes = ["modal", "stack"];
    allRoutes.forEach(route => {
      if (route.type && !validTypes.includes(route.type)) {
        throw new Error(`Invalid type '${route.type}' for route ${route.name}`);
      }
    });

    // Validate role configurations
    const validRoles = ["guest", "user", "admin"];
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
