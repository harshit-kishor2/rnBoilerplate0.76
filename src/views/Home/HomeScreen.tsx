
import React from 'react';
import { View, Text } from 'react-native';
import useHomeScreen from './useHomeScreen';

const HomeScreen = () => {
  const { styles } = useHomeScreen();

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default React.memo(HomeScreen);
