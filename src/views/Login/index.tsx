
import Assets from '@app/assets';
import {AppFastImage, Container, KeyboardAvoidingWrapper, SizedBox, Spacer} from '@app/components';
import {rpHeight, rpWidth} from '@app/helpers/responsive-utils';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import DontHaveAccountLink from './DontHaveAccountLink';
import ForgotPasswordLink from './ForgotPasswordLink';
import LoginForm from './LoginForm';
import TermsConditionAndPrivacyPolicyLink from '../atoms/TermsConditionAndPrivacyPolicyLink';

const LoginScreen: React.FC = () => {
  const styles = useMemo(() => loginScreenStyles(), []);
  return (
    <KeyboardAvoidingWrapper>
      <Container paddingHorizontal={10} alignItems='center'>
        <SizedBox height={rpHeight(50)} />
        <AppFastImage
          source={Assets.image.SPLASH_IMAGE}
          style={styles.splsh_image}
        />
        <SizedBox height={rpHeight(50)} />
        <LoginForm />
        <SizedBox height={rpHeight(25)} />
        <DontHaveAccountLink />
        <SizedBox height={rpHeight(20)} />
        <ForgotPasswordLink />
        <Spacer />
        <TermsConditionAndPrivacyPolicyLink from='LoginRoute' />
      </Container>
    </KeyboardAvoidingWrapper>
  );
};

export default LoginScreen;

const loginScreenStyles = () =>
  StyleSheet.create({
    splsh_image: {
      height: rpWidth(80),
      width: rpWidth(80),
      borderRadius: rpWidth(100)
    },
  });
