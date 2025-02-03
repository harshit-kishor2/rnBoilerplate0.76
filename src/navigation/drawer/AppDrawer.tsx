import {AppVectorIcon} from '@app/components';
import {IconType} from '@app/components/atoms/AppVectorIcon';
import {useAppTheme} from '@app/theme';
import {SettingScreen} from '@app/views';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Platform} from 'react-native';
import {RootStackParamList, RouteConst} from '../utils';
import CustomDrawerContent from './CustomDrawerContent';
import BottomTabNavigator from '../bottom-tab/BottomTabNavigator';

const Drawer = createDrawerNavigator<RootStackParamList>();
const AppDrawer = () => {
  const theme = useAppTheme();
  const drawerIcon = (
    {focused, size}: {focused: boolean; size: number},
    name: string
  ) => {
    return (
      <AppVectorIcon
        type={IconType.MaterialIcons}
        name={name}
        size={size}
        color={focused ? 'red' : 'black'}
      />
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName={RouteConst.BottomTabRoute}
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.colors.transparent,
        drawerInactiveBackgroundColor: theme.colors.transparent,
        drawerActiveTintColor: theme.colors.green,
        drawerInactiveTintColor: theme.colors.onPrimary,
        drawerHideStatusBarOnOpen: Platform.OS === 'ios',
        overlayColor: theme.colors.transparent,
        drawerStyle: {
          backgroundColor: theme.colors.primary,
          width: '60%',
        },
      }}>
      <Drawer.Screen
        name={RouteConst.BottomTabRoute}
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: options => drawerIcon(options, 'home'),
        }}
      />
      <Drawer.Screen
        name={RouteConst.SettingRoute}
        component={SettingScreen}
        options={{
          title: 'Settings',
          drawerIcon: options => drawerIcon(options, 'settings'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
