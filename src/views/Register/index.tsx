
import Assets from '@app/assets';
import {AppFastImage, Container, KeyboardAvoidingWrapper, SizedBox} from '@app/components';
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
      <Container paddingHorizontal={10} alignItems='center'>
        <SizedBox height={rpWidth(50)} />
        <AppFastImage
          source={Assets.image.SPLASH_IMAGE}
          style={styles.splsh_image}
        />
        <SizedBox height={rpWidth(50)} />
        <RegisterForm />
        <SizedBox height={rpWidth(25)} />
        <AlreadyHaveAccountLink />
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
      borderRadius: rpWidth(100)
    }
  });
