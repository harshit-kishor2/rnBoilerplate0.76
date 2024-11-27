
import React from 'react';
import { View, Text } from 'react-native';
import useWebviewScreen from './useWebviewScreen';

const WebviewScreen = () => {
  const { styles } = useWebviewScreen();

  return (
    <View style={styles.container}>
      <Text>WebviewScreen</Text>
    </View>
  );
};

export default React.memo(WebviewScreen);
