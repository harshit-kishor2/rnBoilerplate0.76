import {AppText, Row, SizedBox} from '@app/components';
import {rpWidth} from '@app/helpers/responsive-utils';
import {useAppTranslation} from '@app/i18n';
import {useAppNavigation} from '@app/navigation/hooks';
import {useAppTheme} from '@app/theme';
import React from 'react';
import {Pressable} from 'react-native';

const DontHaveAccountLink: React.FC = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const navigation = useAppNavigation('LoginRoute');

  const onRegisterPress = () => {
    navigation.replace('RegisterRoute', {from: 'LoginRoute'});
  };

  return (
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
  );
};

export default DontHaveAccountLink;