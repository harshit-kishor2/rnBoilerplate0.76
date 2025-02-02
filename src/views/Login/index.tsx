import Assets from '@app/assets';
import {
  AppFastImage,
  Container,
  KeyboardAvoidingWrapper,
  Padding,
  Spacer,
} from '@app/components';
import {rpHeight, rpWidth} from '@app/helpers/responsive-utils';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import TermsConditionAndPrivacyPolicyLink from '../atoms/TermsConditionAndPrivacyPolicyLink';
import DontHaveAccountLink from './DontHaveAccountLink';
import ForgotPasswordLink from './ForgotPasswordLink';
import LoginForm from './LoginForm';
import {RouteConst} from '@app/navigation/types';

const LoginScreen: React.FC = () => {
  const styles = useMemo(() => loginScreenStyles(), []);
  return (
    <KeyboardAvoidingWrapper>
      <Container paddingHorizontal={10} alignItems="center">
        <Padding vertical={rpHeight(50)}>
          <AppFastImage
            source={Assets.image.SPLASH_IMAGE}
            style={styles.splsh_image}
          />
        </Padding>
        <LoginForm />
        <Padding vertical={rpHeight(20)}>
          <DontHaveAccountLink />
        </Padding>
        <ForgotPasswordLink />
        <Spacer />
        <TermsConditionAndPrivacyPolicyLink from={RouteConst.LoginRoute} />
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
      borderRadius: rpWidth(100),
    },
  });
