import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  commonRoutes,
  modalRoutes,
  modalScreenOptions,
  postAuthRoutes,
  preAuthRoutes,
  stackScreenOptions,
} from './route-config';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'SplashRoute'}>
      {/* ==== All common screens put here  ==== */}
      <Stack.Group screenOptions={{...stackScreenOptions}}>
        {commonRoutes.map((route, index) => (
          <Stack.Screen key={route.name + index.toString()} {...route} />
        ))}
      </Stack.Group>

      {/* ==== All PreAuth routes put here ==== */}
      <Stack.Group screenOptions={{...stackScreenOptions}}>
        {preAuthRoutes.map((route, index) => (
          <Stack.Screen key={route.name + index.toString()} {...route} />
        ))}
      </Stack.Group>

      {/* ==== All postAuth routes put here ==== */}
      <Stack.Group screenOptions={{...stackScreenOptions}}>
        {postAuthRoutes.map((route, index) => (
          <Stack.Screen key={route.name + index.toString()} {...route} />
        ))}
      </Stack.Group>

      {/* ==== Put all modal routes here ==== */}
      <Stack.Group screenOptions={{...modalScreenOptions}}>
        {modalRoutes.map((route, index) => (
          <Stack.Screen key={route.name + index.toString()} {...route} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
