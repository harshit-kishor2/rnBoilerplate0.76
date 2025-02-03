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
import {RootStackParamList, RouteConst} from '../utils';
import CustomBottomTab from './CustomBottomTab';

const Tab = createBottomTabNavigator<RootStackParamList>();
const BottomTabNavigator = () => {
  const theme = useAppTheme();
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: theme.colors.yellow,
    tabBarInactiveTintColor: theme.colors.onPrimary,
    tabBarShowLabel: true,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      width: 'auto',
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.secondary,
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
      screenOptions={screenOptions}
      tabBar={CustomBottomTab}>
      <Tab.Screen
        name={RouteConst.HomeTab}
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => getTabIcon('Home', color),
        }}
      />
      <Tab.Screen
        name={RouteConst.ProfileTab}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => getTabIcon('Profile', color),
        }}
      />
      <Tab.Screen
        name={RouteConst.SettingTab}
        component={SettingStackNavigator}
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) => getTabIcon('Settings', color),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
