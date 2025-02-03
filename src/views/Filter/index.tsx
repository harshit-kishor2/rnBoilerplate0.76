import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '@app/theme';
import {useAppTranslation} from '@app/i18n';

const FilterScreen: React.FC = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => filterScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text> {translate('greeting')} FilterScreen</Text>
    </View>
  );
};

export default FilterScreen;

const filterScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
