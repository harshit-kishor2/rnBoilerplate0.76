import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '@app/theme';
import {useAppTranslation} from '@app/i18n';

const ProfileScreen: React.FC = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => profileScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text> {translate('greeting')} ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const profileScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
