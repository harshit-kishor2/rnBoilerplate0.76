import {ProfileScreen} from '@app/views';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, RouteConst} from '../types';
import {SCREEN_OPTIONS} from '../navigation-service';

const ProfileStack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName={RouteConst.ProfileRoute}
      screenOptions={SCREEN_OPTIONS.stack}>
      <ProfileStack.Screen
        name={RouteConst.ProfileRoute}
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default HomeStackNavigator;
