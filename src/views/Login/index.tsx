
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme';
import { useAppTranslation } from '@app/i18n';

const LoginScreen = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => loginScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text>{translate('greeting')} LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;

const loginScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
