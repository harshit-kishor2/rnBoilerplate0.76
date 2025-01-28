import {AppButton, AppFormTextInput, AppVectorIcon, SizedBox} from '@app/components';
import {IconType} from '@app/components/atoms/AppVectorIcon';
import {consoleLog} from '@app/helpers/logger';
import {rpHeight} from '@app/helpers/responsive-utils';
import {RegisterSchema} from '@app/helpers/validation-schema';
import {useAppTranslation} from '@app/i18n';
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';

const RegisterForm: React.FC = () => {
  const translate = useAppTranslation();

  const {...methods} = useForm<RegisterFormData>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  });

  const onRegisterSubmitHandler: SubmitHandler<RegisterFormData> = (data: LoginFormData) => {
    consoleLog('Formik register data====>', data);
  };

  const onRegisterSubmitErrorHandler: SubmitErrorHandler<RegisterFormData> = (errors: any) => {
    consoleLog('Formik register error====>', errors);
  };


  return (
    <>
      <FormProvider {...methods}>
        <AppFormTextInput
          name="email"
          label="Email"
          placeholder="jon.doe@email.com"
          keyboardType="email-address"
          returnKeyType='next'
          rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="mail" />}
        />
        <AppFormTextInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          keyboardType="default"
          returnKeyType='next'
          rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="password" />}
        />
        <AppFormTextInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter your password"
          keyboardType="default"
          returnKeyType='next'
          rightIcon={<AppVectorIcon type={IconType.MaterialIcons} name="password" />}
        />
      </FormProvider>
      <SizedBox height={rpHeight(20)} />
      <AppButton
        onPress={methods.handleSubmit(onRegisterSubmitHandler, onRegisterSubmitErrorHandler)}
        title={translate('login_screen.login')} />
    </>
  );
};

export default RegisterForm;