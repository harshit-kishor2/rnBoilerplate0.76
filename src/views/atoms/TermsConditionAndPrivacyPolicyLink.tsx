import {AppText, Padding, Row} from "@app/components";
import {rpWidth} from "@app/helpers/responsive-utils";
import {useAppTranslation} from "@app/i18n";
import {useAppNavigation} from "@app/navigation/hooks";
import React from "react";

type ITermsConditionAndPrivacyPolicyLink = {
  from: keyof RootStackParamList;
};
const TermsConditionAndPrivacyPolicyLink: React.FC<
  ITermsConditionAndPrivacyPolicyLink
> = props => {
  const {from} = props;
  const translate = useAppTranslation();
  const navigation = useAppNavigation("LoginRoute");

  const onTermsOfServicePress = () => {
    navigation.navigate("WebViewRoute", {
      from: from,
      page: "t&c",
      webUrl: "https://google.com",
    });
  };

  const onPrivacyPolicyPress = () => {
    navigation.navigate("WebViewRoute", {
      from: from,
      page: "p&p",
      webUrl: "https://google.com",
    });
  };

  return (
    <>
      <AppText
        text={translate("login_screen.by_continuing_you_agree_to_our")}
      />
      <Row>
        <AppText
          onPress={onTermsOfServicePress}
          text={translate("login_screen.terms_of_service")}
        />
        <Padding horizontal={rpWidth(5)}>
          <AppText text={translate("login_screen.and")} />
        </Padding>
        <AppText
          onPress={onPrivacyPolicyPress}
          text={translate("login_screen.privacy_policy")}
        />
      </Row>
    </>
  );
};

export default TermsConditionAndPrivacyPolicyLink;
