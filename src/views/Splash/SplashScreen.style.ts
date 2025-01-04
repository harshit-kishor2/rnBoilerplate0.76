
import {rpWidth} from '@app/helpers';
import {StyleSheet, ViewStyle} from 'react-native';

interface Style {
  container: ViewStyle;
  version: ViewStyle;
  splsh_image: ViewStyle;
}

const splashScreenStyles = () =>
  StyleSheet.create<Style>({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    version: {
      position: 'absolute',
      bottom: 5,
      right: 5
    },
    splsh_image: {
      height: rpWidth(200),
      width: rpWidth(200),
      borderRadius: rpWidth(100)
    }
  });

export default splashScreenStyles;