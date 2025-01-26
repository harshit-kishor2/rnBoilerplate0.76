
import Assets from '@app/assets';
import {AppButton, AppFastImage, AppText, AppTextInput, AppVectorIcon, Container, KeyboardAvoidingWrapper, Row, SizedBox, Spacer} from '@app/components';
import {IconType} from '@app/components/atoms/AppVectorIcon';
import {rpHeight, rpWidth} from '@app/helpers';
import {useAppTranslation} from '@app/i18n';
import {useAppNavigation} from '@app/navigation/hooks';
import {useAppTheme} from '@app/theme';
import React, {useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';

const LoginScreen = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => loginScreenStyles(), []);
  const navigation = useAppNavigation('LoginRoute');

  const onLoginPress = () => {
    navigation.replace('RegisterRoute', {from: 'LoginRoute'});
  };

  const onForgotPasswordPress = () => {
    // navigation.navigate('ForgotPasswordRoute', {from: 'LoginRoute'})
  };
  const onTermsOfServicePress = () => {
    navigation.navigate('WebViewRoute', {from: 'LoginRoute', page: 't&c', webUrl: 'https://google.com'});
  };

  const onPrivacyPolicyPress = () => {
    navigation.navigate('WebViewRoute', {from: 'LoginRoute', page: 'p&p', webUrl: 'https://google.com'});
  };

  return (
    <KeyboardAvoidingWrapper>
      <Container paddingHorizontal={10} alignItems='center'>
        <SizedBox height={rpHeight(50)} />
        <AppFastImage
          source={Assets.image.SPLASH_IMAGE}
          style={styles.splsh_image}
        />
        <SizedBox height={rpHeight(50)} />
        <AppTextInput
          variant="outlined"
          label={translate('login_screen.email')}
          rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="email" />}
        />
        <AppTextInput
          variant="outlined"
          label={translate('login_screen.password')}
          rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="password" />}
        />
        <SizedBox height={rpHeight(20)} />
        <AppButton title={translate('login_screen.login')} />
        <SizedBox height={rpHeight(25)} />
        {/* Register button  */}
        <Row>
          <AppText text={translate('login_screen.dont_have_account')} />
          <SizedBox width={rpWidth(5)} />
          <Pressable onPress={onLoginPress}>
            <AppText
              text={translate('login_screen.register')}
              color={theme.colors.blue}
            />
          </Pressable>
        </Row>
        <SizedBox height={rpHeight(20)} />
        {/* Forgot password button  */}
        <Pressable onPress={onForgotPasswordPress}>
          <AppText
            text={translate('login_screen.forgot_password')}
            color={theme.colors.blue}
          />
        </Pressable>

        <Spacer />

        {/* terms of service and privacy policy row */}
        <AppText text={translate('login_screen.by_continuing_you_agree_to_our')}/>
        <Row>
          <Pressable onPress={onTermsOfServicePress}>
            <AppText
              text={translate('login_screen.terms_of_service')}
              color={theme.colors.blue}
            />
          </Pressable>
          <SizedBox width={rpWidth(5)} />
          <AppText
            text={translate('login_screen.and')}
          />
          <SizedBox width={rpWidth(5)} />
          <Pressable onPress={onPrivacyPolicyPress}>
            <AppText
              text ={translate('login_screen.privacy_policy')}
              color={theme.colors.blue}
            />
          </Pressable>
        </Row>

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
