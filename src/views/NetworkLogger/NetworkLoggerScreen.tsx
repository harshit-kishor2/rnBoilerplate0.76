
import React from 'react';
import { View, Text } from 'react-native';
import useNetworkLoggerScreen from './useNetworkLoggerScreen';

const NetworkLoggerScreen = () => {
  const { styles } = useNetworkLoggerScreen();

  return (
    <View style={styles.container}>
      <Text>NetworkLoggerScreen</Text>
    </View>
  );
};

export default React.memo(NetworkLoggerScreen);
