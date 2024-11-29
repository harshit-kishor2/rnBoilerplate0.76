
import {StyleSheet} from 'react-native';

const homeScreenStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.blue,
    },
    text: {
      color: theme.colors.red,
    }
  });

export default homeScreenStyles;
