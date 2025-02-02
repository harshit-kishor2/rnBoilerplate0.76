import {
  AppButton,
  AppFormTextInput,
  AppVectorIcon,
  SizedBox,
} from "@app/components";
import {IconType} from "@app/components/atoms/AppVectorIcon";
import {consoleLog} from "@app/helpers/logger";
import {rpHeight} from "@app/helpers/responsive-utils";
import {LoginSchema} from "@app/helpers/validation-schema";
import {useAppTranslation} from "@app/i18n";
import {useAppNavigation} from "@app/navigation/hooks";
import {RouteConst} from "@app/navigation/types";
import {usePersistAuthStore} from "@app/store/zustand/use-auth-store";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const LoginForm = () => {
  const {login} = usePersistAuthStore();
  const navigation = useAppNavigation<RouteConst.LoginRoute>();
  const translate = useAppTranslation();
  const {...methods} = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  const onLoginSubmitHandler: SubmitHandler<LoginFormData> = (
    data: LoginFormData
  ) => {
    login(data).then(() => {
      navigation.replace(RouteConst.HomeRoute, {from: RouteConst.LoginRoute});
    });
  };

  const onLoginSubmitErrorHandler: SubmitErrorHandler<LoginFormData> = (
    errors: any
  ) => {
    consoleLog("Formik error====>", errors);
  };

  return (
    <>
      <FormProvider {...methods}>
        <AppFormTextInput
          name="email"
          label="Email"
          placeholder="jon.doe@email.com"
          keyboardType="email-address"
          rightIcon={
            <AppVectorIcon type={IconType.MaterialIcons} name="mail" />
          }
        />
        <AppFormTextInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          keyboardType="email-address"
          rightIcon={
            <AppVectorIcon type={IconType.MaterialIcons} name="password" />
          }
          keyboardAppearance="default"
          returnKeyType="next"
        />
      </FormProvider>
      <SizedBox height={rpHeight(20)} />
      <AppButton
        onPress={methods.handleSubmit(
          onLoginSubmitHandler,
          onLoginSubmitErrorHandler
        )}
        title={translate("login_screen.login")}
      />
    </>
  );
};

export default LoginForm;
