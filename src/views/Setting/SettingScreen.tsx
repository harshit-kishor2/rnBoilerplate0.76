
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme';
import { useAppTranslation } from '@app/i18n';

const SettingScreen: React.FC = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => settingScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text> {translate('greeting')} SettingScreen</Text>
    </View>
  );
};

export default SettingScreen;

const settingScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
