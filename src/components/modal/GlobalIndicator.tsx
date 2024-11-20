import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {createRef, useMemo} from 'react';
import GlobalModalContainer, {GlobalModalRef} from './GlobalModalContainer';
import {useAppTheme} from '@app/theme';
import {rpWidth} from '@app/helpers/responsive';

export const loaderGlobalIndicator = createRef<GlobalModalRef>();

/**
 * A global indicator that is shown when a long-running operation is in progress.
 *
 * The indicator is a full-screen modal that displays a large, colored
 * {@link ActivityIndicator} and a text message that says "Please wait ...".
 *
 * The indicator is controlled by the {@link loaderGlobalIndicator} ref, which
 * can be used to show or hide the indicator from anywhere in the app.
 *
 * The indicator is styled according to the current theme.
 */

const GlobalIndicator: React.FC = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => useAppStyles(theme), [theme]);
  return (
    <GlobalModalContainer isLoading={false} ref={loaderGlobalIndicator}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size={'large'}
          color={theme.colors.primary}
          style={styles.loaderStyle}
        />
        <Text>
          Please wait...
        </Text>
      </View>
    </GlobalModalContainer>
  );
};

export default GlobalIndicator;

const useAppStyles = (theme: AppTheme) => StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: rpWidth(7),
    justifyContent: 'center',
    padding: rpWidth(10),
  },
  loaderStyle: {
    padding: rpWidth(7),
  },
});