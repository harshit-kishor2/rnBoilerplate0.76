
import Assets from '@app/assets';
import {AppButton, AppFastImage, AppText, AppTextInput, AppVectorIcon, Container, KeyboardAvoidingWrapper, Row, SizedBox} from '@app/components';
import {IconType} from '@app/components/atoms/AppVectorIcon';
import {rpWidth} from '@app/helpers/responsive-utils';
import showToast, {ToastMessageConst} from '@app/helpers/show-toast';
import {useAppTranslation} from '@app/i18n';
import {useAppNavigation} from '@app/navigation/hooks';
import {useAppTheme} from '@app/theme';
import React, {useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';

const RegisterScreen: React.FC = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => registerScreenStyles(), [theme]);
  const navigation = useAppNavigation('RegisterRoute');

  const onLoginPress = () => {
    navigation.replace('LoginRoute', {from: 'RegisterRoute'});
  };

  const onRegisterPress = () => {
    //  call register api here
    showToast('info', ToastMessageConst.UNDER_CONSTRUCTION, {text2: ToastMessageConst.UNDER_CONSTRUCTION_MSG});
  };
  return (
    <KeyboardAvoidingWrapper>
      <Container paddingHorizontal={10} alignItems='center'>
        <SizedBox height={rpWidth(50)} />
        <AppFastImage
          source={Assets.image.SPLASH_IMAGE}
          style={styles.splsh_image}
        />
        <SizedBox height={rpWidth(50)} />
        <AppTextInput
          variant="outlined"
          label={translate('register_screen.email')}
          rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="mail" />}
        />
        <AppTextInput
          value=''
          variant="outlined"
          label={translate('register_screen.password')}
          rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="password" />}
        />
        <AppTextInput
          value=''
          variant="outlined"
          label={translate('register_screen.confirm_password')}
          rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="password" />}
        />
        <SizedBox height={rpWidth(20)} />
        <AppButton
          title={translate('register_screen.register')}
          onPress={onRegisterPress}
        />
        <SizedBox height={rpWidth(25)} />
        <Row>
          <AppText
            text={translate('register_screen.already_have_account')}
          />
          <SizedBox width={rpWidth(5)} />
          <Pressable onPress={onLoginPress}>
            <AppText
              text={translate('register_screen.login')}
              color={theme.colors.blue}
            />
          </Pressable>
        </Row>
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
