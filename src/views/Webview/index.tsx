
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme';
import { useAppTranslation } from '@app/i18n';

const WebviewScreen = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => webviewScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text> {translate('greeting')} WebviewScreen</Text>
    </View>
  );
};

export default WebviewScreen;

const webviewScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
