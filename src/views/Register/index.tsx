
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme';
import { useAppTranslation } from '@app/i18n';

const RegisterScreen = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => registerScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text> {translate('greeting')} RegisterScreen</Text>
    </View>
  );
};

export default RegisterScreen;

const registerScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
