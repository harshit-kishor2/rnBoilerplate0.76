
import React from 'react';
import { View, Text } from 'react-native';
import useSettingScreen from './useSettingScreen';

const SettingScreen = () => {
  const { styles } = useSettingScreen();

  return (
    <View style={styles.container}>
      <Text>SettingScreen</Text>
    </View>
  );
};

export default React.memo(SettingScreen);
