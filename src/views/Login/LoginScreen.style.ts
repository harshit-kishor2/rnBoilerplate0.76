
import {StyleSheet} from 'react-native';

const loginScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.red,
    },
  });

export default loginScreenStyles;
