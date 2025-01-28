
import Assets from '@app/assets';
import {AppButton, AppFastImage, AppFormTextInput, AppText, AppVectorIcon, Container, KeyboardAvoidingWrapper, Row, SizedBox, Spacer} from '@app/components';
import {IconType} from '@app/components/atoms/AppVectorIcon';
import {useAppTranslation} from '@app/i18n';
import {useAppNavigation} from '@app/navigation/hooks';
import {useAppTheme} from '@app/theme';
import React, {useMemo} from 'react';
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {Pressable, StyleSheet} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import {LoginSchema} from '@app/helpers/validation-schema';
import {rpHeight, rpWidth} from '@app/helpers/responsive-utils';
import {showToast} from '@app/helpers/show-toast';


const LoginScreen: React.FC = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => loginScreenStyles(), []);
  const navigation = useAppNavigation('LoginRoute');

  const {...methods} = useForm<LoginFormData>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });
  const onRegisterPress = () => {
    navigation.replace('RegisterRoute', {from: 'LoginRoute'});
  };

  const onForgotPasswordPress = () => {
    showToast('info', 'Under Development', {text2: 'This feature is under development'});
    // navigation.navigate('ForgotPasswordRoute', {from: 'LoginRoute'})
  };
  const onTermsOfServicePress = () => {
    navigation.navigate('WebViewRoute', {from: 'LoginRoute', page: 't&c', webUrl: 'https://google.com'});
  };

  const onPrivacyPolicyPress = () => {
    navigation.navigate('WebViewRoute', {from: 'LoginRoute', page: 'p&p', webUrl: 'https://google.com'});
  };

  const onLoginSubmitHandler: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    console.log('Formik data====>',data);
  }

  const onLoginSubmitErrorHandler: SubmitErrorHandler<LoginFormData> = (errors : any) => {
    console.log('Formik error====>',errors);
  }
  return (
    <KeyboardAvoidingWrapper>
      <Container paddingHorizontal={10} alignItems='center'>
        <SizedBox height={rpHeight(50)} />
        <AppFastImage
          source={Assets.image.SPLASH_IMAGE}
          style={styles.splsh_image}
        />
        <SizedBox height={rpHeight(50)} />
        <FormProvider {...methods}>
          <AppFormTextInput
            name="email"
            label="Email"
            placeholder="jon.doe@email.com"
            keyboardType="email-address"
            defaultValue='Hello'
            rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="mail" />}
          />
          <AppFormTextInput
            name="password"
            // label="Password"
            placeholder="Enter your password"
            keyboardType="email-address"
            rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="password" />}
            keyboardAppearance='default'
            returnKeyType='next'
          />
        </FormProvider>
        <SizedBox height={rpHeight(20)} />
        <AppButton
          onPress={methods.handleSubmit(onLoginSubmitHandler, onLoginSubmitErrorHandler)}
          title={translate('login_screen.login')} />
        <SizedBox height={rpHeight(25)} />
        {/* Register button  */}
        <Row>
          <AppText text={translate('login_screen.dont_have_account')} />
          <SizedBox width={rpWidth(5)} />
          <Pressable onPress={onRegisterPress}>
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
