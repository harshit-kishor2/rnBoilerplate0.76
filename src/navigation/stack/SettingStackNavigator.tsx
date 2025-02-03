import {SettingScreen} from '@app/views';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, RouteConst, SCREEN_OPTIONS} from '../utils';

const SettingStack = createStackNavigator<RootStackParamList>();

const SettingStackNavigator: React.FC = () => {
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
