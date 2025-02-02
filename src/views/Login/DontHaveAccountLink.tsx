import {AppText, Row, SizedBox} from "@app/components";
import {rpWidth} from "@app/helpers/responsive-utils";
import {useAppTranslation} from "@app/i18n";
import {useAppNavigation} from "@app/navigation/hooks";
import {RouteConst} from "@app/navigation/types";
import React from "react";

const DontHaveAccountLink: React.FC = () => {
  const translate = useAppTranslation();
  const navigation = useAppNavigation<RouteConst.LoginRoute>();

  const onRegisterPress = () => {
    navigation.replace(RouteConst.RegisterRoute, {from: RouteConst.LoginRoute});
  };

  return (
    <Row>
      <AppText text={translate("login_screen.dont_have_account")} />
      <SizedBox width={rpWidth(5)} />
      <AppText
        onPress={onRegisterPress}
        text={translate("login_screen.register")}
      />
    </Row>
  );
};

export default DontHaveAccountLink;
