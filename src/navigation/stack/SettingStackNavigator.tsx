import {SettingScreen} from '@app/views';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, RouteConst} from '../types';
import {SCREEN_OPTIONS} from '../navigation-service';

const SettingStack = createStackNavigator<RootStackParamList>();

const SettingStackNavigator = () => {
  return (
    <SettingStack.Navigator
      initialRouteName={RouteConst.SettingRoute}
      screenOptions={SCREEN_OPTIONS.stack}>
      <SettingStack.Screen
        name={RouteConst.SettingRoute}
        component={SettingScreen}
      />
    </SettingStack.Navigator>
  );
};

export default SettingStackNavigator;
