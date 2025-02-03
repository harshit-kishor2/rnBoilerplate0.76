import {useAppTheme} from '@app/theme';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useMemo} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const CustomBottomTab = (props: BottomTabBarProps) => (
  <CustomTabBar {...props} />
);

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const translateX = useSharedValue(0);
  const TAB_WIDTH = width / state.routes.length;

  React.useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH);
  }, [state.index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.indicator, {width: TAB_WIDTH}, animatedStyle]}
      />

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.title ?? route.name;

        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}>
            {options?.tabBarIcon?.({
              color: isFocused ? theme.colors.green : theme.colors.onPrimary,
              focused: false,
              size: 0,
            })}
            <Text style={[styles.text, isFocused && styles.textActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const createStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 60,
      backgroundColor: theme.colors.primary,
      elevation: 5,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.1,
      shadowRadius: 5,
      overflow: 'hidden',
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      color: theme.colors.onPrimary,
      marginTop: 4,
    },
    textActive: {
      fontWeight: 'bold',
      color: theme.colors.green,
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      height: 4,
      backgroundColor: theme.colors.green,
      borderRadius: 2,
    },
  });
