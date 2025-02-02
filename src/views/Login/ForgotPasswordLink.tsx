import {AppText} from '@app/components';
import showToast, {ToastMessageConst} from '@app/helpers/show-toast';
import {useAppTranslation} from '@app/i18n';
import React from 'react';

const ForgotPasswordLink: React.FC = () => {
  const translate = useAppTranslation();
  const onForgotPasswordPress = () => {
    showToast('info', ToastMessageConst.UNDER_CONSTRUCTION, {
      text2: ToastMessageConst.UNDER_CONSTRUCTION_MSG,
    });
    // navigation.navigate('ForgotPasswordRoute', {from: 'LoginRoute'})
  };

  return (
    <AppText
      onPress={onForgotPasswordPress}
      text={translate('login_screen.forgot_password')}
    />
  );
};

export default ForgotPasswordLink;
