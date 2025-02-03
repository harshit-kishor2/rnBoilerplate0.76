import {ProfileScreen} from '@app/views';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, RouteConst, SCREEN_OPTIONS} from '../utils';

const ProfileStack = createStackNavigator<RootStackParamList>();

const ProfileStackNavigator: React.FC = () => {
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

export default ProfileStackNavigator;
