import {SettingScreen} from '@app/views';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import BottomTabNavigator from '../bottom-tabs/BottomTabNavigator';
import {RootStackParamList, RouteConst} from '../types';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator<RootStackParamList>();
const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={RouteConst.BottomTabRoute}
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerStyle: {width: '75%'},
        headerShown: false,
        swipeEnabled: true,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={RouteConst.BottomTabRoute}
        component={BottomTabNavigator}
      />
      <Drawer.Screen name={RouteConst.SettingRoute} component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
