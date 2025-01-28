import {AppText, Row, SizedBox} from '@app/components';
import {rpWidth} from '@app/helpers/responsive-utils';
import {useAppTranslation} from '@app/i18n';
import {useAppNavigation} from '@app/navigation/hooks';
import {useAppTheme} from '@app/theme';
import React from 'react';
import {Pressable} from 'react-native';

type ITermsConditionAndPrivacyPolicyLink = {
  from: keyof RootStackParamList;
};
const TermsConditionAndPrivacyPolicyLink: React.FC<ITermsConditionAndPrivacyPolicyLink> = (props) => {
  const {from} = props;
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const navigation = useAppNavigation('LoginRoute');

  const onTermsOfServicePress = () => {
    navigation.navigate('WebViewRoute', {from: from, page: 't&c', webUrl: 'https://google.com'});
  };

  const onPrivacyPolicyPress = () => {
    navigation.navigate('WebViewRoute', {from: from, page: 'p&p', webUrl: 'https://google.com'});
  };

  return (
    <>
      <AppText text={translate('login_screen.by_continuing_you_agree_to_our')} />
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
            text={translate('login_screen.privacy_policy')}
            color={theme.colors.blue}
          />
        </Pressable>
      </Row>
    </>
  );
};

export default TermsConditionAndPrivacyPolicyLink;