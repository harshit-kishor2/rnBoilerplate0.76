import Assets from '@app/assets';
import {
  AppFastImage,
  Container,
  KeyboardAvoidingWrapper,
  Padding,
} from '@app/components';
import {rpWidth} from '@app/helpers/responsive-utils';
import {useAppTheme} from '@app/theme';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import AlreadyHaveAccountLink from './AlreadyHaveAccountLink';
import RegisterForm from './RegisterForm';

const RegisterScreen: React.FC = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => registerScreenStyles(), [theme]);

  return (
    <KeyboardAvoidingWrapper>
      <Container paddingHorizontal={10} alignItems="center">
        <Padding vertical={rpWidth(50)}>
          <AppFastImage
            source={Assets.image.SPLASH_IMAGE}
            style={styles.splsh_image}
          />
        </Padding>
        <RegisterForm />
        <Padding vertical={rpWidth(20)}>
          <AlreadyHaveAccountLink />
        </Padding>
      </Container>
    </KeyboardAvoidingWrapper>
  );
};

export default RegisterScreen;

const registerScreenStyles = () =>
  StyleSheet.create({
    splsh_image: {
      height: rpWidth(80),
      width: rpWidth(80),
      borderRadius: rpWidth(100),
    },
  });
