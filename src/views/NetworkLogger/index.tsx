
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme';
import { useAppTranslation } from '@app/i18n';

const NetworkLoggerScreen = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => networkLoggerScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text> {translate('greeting')} NetworkLoggerScreen</Text>
    </View>
  );
};

export default NetworkLoggerScreen;

const networkLoggerScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
