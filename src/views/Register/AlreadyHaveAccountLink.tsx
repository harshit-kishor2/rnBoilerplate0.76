import {AppText, Row, SizedBox} from '@app/components';
import {rpWidth} from '@app/helpers/responsive-utils';
import {useAppTranslation} from '@app/i18n';
import {useAppNavigation} from '@app/navigation/hooks';
import {useAppTheme} from '@app/theme';
import React from 'react';

const AlreadyHaveAccountLink: React.FC = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const navigation = useAppNavigation('RegisterRoute');
  const onLoginPress = () => {
    navigation.replace('LoginRoute', {from: 'RegisterRoute'});
  };
  return (
    <Row>
      <AppText text={translate('register_screen.already_have_account')} />
      <SizedBox width={rpWidth(5)} />
      <AppText
        onPress={onLoginPress}
        text={translate('register_screen.login')}
        color={theme.colors.blue}
      />
    </Row>
  );
};

export default AlreadyHaveAccountLink;
