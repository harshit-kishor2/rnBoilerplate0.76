
import React from 'react';
import { View, Text } from 'react-native';
import useRegisterScreen from './useRegisterScreen';

const RegisterScreen = () => {
  const { styles } = useRegisterScreen();

  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>
    </View>
  );
};

export default React.memo(RegisterScreen);
