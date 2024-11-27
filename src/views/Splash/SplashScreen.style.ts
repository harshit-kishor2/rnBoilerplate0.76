
import {rpWidth} from '@app/helpers';
import {StyleSheet} from 'react-native';

const splashScreenStyles = () =>
  StyleSheet.create({
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