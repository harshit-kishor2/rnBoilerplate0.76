import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  commonRoutes,
  modalRoutes,
  modalScreenOptions,
  postAuthRoutes,
  preAuthRoutes,
  stackScreenOptions
} from './routeConfig';


const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  // get Data from api/store/sharedpref
  const hasAccountData = true;

  const getInitialRoute = () => {
    let initialRoute: keyof RootStackParamList;
    if (hasAccountData) {
      initialRoute = 'HomeRoute';
    } else {
      initialRoute = 'LoginRoute';
    }
    return initialRoute;

  };

  return <Stack.Navigator
    initialRouteName={getInitialRoute()}
  >
    {/* All routes put here */}
    <Stack.Group
      screenOptions={{...stackScreenOptions}}
    >
      {hasAccountData ?
        postAuthRoutes.map((route, index) =>
          <Stack.Screen key={route.name + index.toString()}  {...route} />
        ) :
        preAuthRoutes.map((route, index) =>
          <Stack.Screen key={route.name + index.toString()}  {...route} />
        )
      }
      {/* <Stack.Screen name='HomeRoute' component={HomeScreen} /> */}
    </Stack.Group>

    {/*  All common screens put here */}
    <Stack.Group
      screenOptions={{...stackScreenOptions}}
    >
      {
        commonRoutes.map((route, index) =>
          <Stack.Screen key={route.name + index.toString()}  {...route} />
        )
      }
    </Stack.Group>

    {/* Put all modal routes here */}
    <Stack.Group screenOptions={{...modalScreenOptions}}>
      {
        modalRoutes.map((route, index) =>
          <Stack.Screen key={route.name + index.toString()}  {...route} />
        )
      }
    </Stack.Group>
  </Stack.Navigator>;
};


export default StackNavigator;