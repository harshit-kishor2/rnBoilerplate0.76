import {AppText} from '@app/components';
import showToast, {ToastMessageConst} from '@app/helpers/show-toast';
import {useAppTranslation} from '@app/i18n';
import {useAppTheme} from '@app/theme';
import React from 'react';
import {Pressable} from 'react-native';

const ForgotPasswordLink: React.FC = () => {
  const translate = useAppTranslation();
  const theme = useAppTheme();
  const onForgotPasswordPress = () => {
    showToast('info', ToastMessageConst.UNDER_CONSTRUCTION, {text2: ToastMessageConst.UNDER_CONSTRUCTION_MSG});
    // navigation.navigate('ForgotPasswordRoute', {from: 'LoginRoute'})
  };

  return (
    <Pressable onPress={onForgotPasswordPress}>
      <AppText
        text={translate('login_screen.forgot_password')}
        color={theme.colors.blue}
      />
    </Pressable>
  );
};

export default ForgotPasswordLink;
