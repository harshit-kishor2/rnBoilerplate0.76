import {HomeScreen} from '@app/views';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, RouteConst} from '../types';
import {SCREEN_OPTIONS} from '../navigation-service';

const HomeStack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={RouteConst.HomeRoute}
      screenOptions={SCREEN_OPTIONS.stack}>
      <HomeStack.Screen name={RouteConst.HomeRoute} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
