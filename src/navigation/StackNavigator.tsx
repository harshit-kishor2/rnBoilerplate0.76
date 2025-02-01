import {useSplashTimeout} from "@app/hooks";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useState} from "react";
import {
  allRoutes,
  modalScreenOptions,
  stackScreenOptions,
} from "./route-config";
import {usePersistAuthStore} from "@app/store/zustand/use-auth-store";
import {SplashScreen} from "@app/views";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  const {isAuth, userRole} = usePersistAuthStore();

  const isSplashEnd = useSplashTimeout(() => {
    console.log("Splash ended! Navigating to the next screen.");
    // Determine initial route based on user role
    let routeName: keyof RootStackParamList = "LoginRoute";
    if (isAuth) {
      routeName = userRole === "admin" ? "BottomTabRoute" : "HomeRoute";
    }
    setInitialRoute(routeName);
  });

  // Filter routes based on user role
  const filteredRoutes = allRoutes.filter(route =>
    route.role.includes(userRole)
  );

  // Separate stack-based and modal-based routes
  const stackRoutes = filteredRoutes.filter(route => route.type === "stack");
  const modalRoutes = filteredRoutes.filter(route => route.type === "modal");

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
        {stackRoutes.map(({name, component}) => (
          <Stack.Screen
            key={name.toString()}
            name={name}
            component={component}
          />
        ))}
      </Stack.Group>

      {/* Modal-based routes */}
      <Stack.Group screenOptions={modalScreenOptions}>
        {modalRoutes.map(({name, component}) => (
          <Stack.Screen
            key={name.toString()}
            name={name}
            component={component}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
