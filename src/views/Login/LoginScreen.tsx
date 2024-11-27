
import React from 'react';
import { View, Text } from 'react-native';
import useLoginScreen from './useLoginScreen';

const LoginScreen = () => {
  const { styles } = useLoginScreen();

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default React.memo(LoginScreen);
