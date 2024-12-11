
import {StyleSheet} from 'react-native';

const networkLoggerScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });

export default networkLoggerScreenStyles;
