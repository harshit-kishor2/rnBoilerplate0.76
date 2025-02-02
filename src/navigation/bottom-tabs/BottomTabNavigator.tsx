import {AppVectorIcon} from '@app/components';
import {IconType} from '@app/components/atoms/AppVectorIcon';
import {rpHeight, rpWidth} from '@app/helpers/responsive-utils';
import {useAppTheme} from '@app/theme';
import {ProfileScreen} from '@app/views';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStackNavigator from '../stack/HomeStackNavigator';
import SettingStackNavigator from '../stack/SettingStackNavigator';
import {RootStackParamList, RouteConst} from '../types';

const Tab = createBottomTabNavigator<RootStackParamList>();
const BottomTabNavigator = () => {
  const theme = useAppTheme();
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: theme.colors.blue,
    tabBarInactiveTintColor: theme.colors.black,
    tabBarShowLabel: true,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      width: 'auto',
      backgroundColor: theme.colors.yellow,
      borderColor: theme.colors.green,
      height: rpHeight(75),
    },
    tabBarItemStyle: {
      margin: rpWidth(10),
    },
  };

  const getTabIcon = (key: string, color: string) => {
    switch (key) {
      case 'Home':
        return (
          <AppVectorIcon
            name="home"
            color={color}
            size={24}
            type={IconType.MaterialIcons}
          />
        );
      case 'Settings':
        return (
          <AppVectorIcon
            name="settings"
            color={color}
            size={24}
            type={IconType.MaterialIcons}
          />
        );
      case 'Profile':
        return (
          <AppVectorIcon
            name="user"
            color={color}
            size={24}
            type={IconType.FontAwesome}
          />
        );
      default:
        break;
    }
  };

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={RouteConst.ProfileTab}
      screenOptions={screenOptions}>
      <Tab.Screen
        name={RouteConst.HomeTab}
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => getTabIcon('Home', color),
        }}
      />
      <Tab.Screen
        name={RouteConst.ProfileTab}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => getTabIcon('Profile', color),
        }}
      />
      <Tab.Screen
        name={RouteConst.SettingTab}
        component={SettingStackNavigator}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => getTabIcon('Settings', color),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
