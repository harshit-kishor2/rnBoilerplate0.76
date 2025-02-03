import {AppVectorIcon} from '@app/components';
import {IconType} from '@app/components/atoms/AppVectorIcon';
import {useAppTheme} from '@app/theme';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const scale = useSharedValue(1);

  const theme = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handleLogoutPress = () => {
    scale.value = withSpring(0.9, {damping: 5}, () => {
      scale.value = withSpring(1);
    });
    // Add your logout logic here
    console.log('User logged out');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{uri: 'https://via.placeholder.com/80'}}
            style={styles.profileImage}
          />
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.email}>johndoe@example.com</Text>
        </View>

        {/* Drawer Items */}
        {/* <DrawerItemList {...props} /> */}
        {props.state.routes.map(route => {
          const {options} = props.descriptors[route.key];
          const label = options.title ?? route.name;
          return (
            <DrawerItem
              key={route.key}
              style={styles.drawerItem}
              label={label}
              onPress={() => props.navigation.navigate(route.name)}
              icon={options.drawerIcon}
            />
          );
        })}

        {/* Animated Logout Button */}
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            onPress={handleLogoutPress}
            style={styles.logoutBtn}>
            <AppVectorIcon
              name="logout"
              type={IconType.MaterialIcons}
              size={22}
              color="white"
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const createStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    profileSection: {
      alignItems: 'center',
      marginBottom: 20,
      paddingTop: 30,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    drawerItem: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      marginBottom: 10,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.onPrimary,
    },
    email: {
      fontSize: 14,
      color: theme.colors.onPrimary,
    },
    logoutBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.green,
      padding: 12,
      borderRadius: 8,
      justifyContent: 'center',
      marginTop: 20,
    },
    logoutText: {
      color: 'white',
      fontSize: 16,
      marginLeft: 8,
      fontWeight: 'bold',
    },
  });
