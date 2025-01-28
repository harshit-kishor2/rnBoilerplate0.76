import React from 'react';
import {useController, UseControllerProps, useFormContext} from 'react-hook-form';
import AppTextInput, {IAppTextInputProps} from './AppTextInput';

interface TextInputProps extends IAppTextInputProps, UseControllerProps {
  name: string;
  defaultValue?: string;
}
const ControlledInput: React.FC<TextInputProps> = (props) => {
  const {formState} = useFormContext();
  const {
    name,
    rules,
    defaultValue,
    ...inputProps
  } = props;
  const {field} = useController({name, rules, defaultValue});
  const hasError = Boolean(formState?.errors[name]);
  return (
    <AppTextInput
      error={hasError ? formState.errors[name]?.message?.toString() : ''}
      variant='outlined'
      autoCapitalize="none"
      textAlign="left"
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      defaultValue={defaultValue}
      {...inputProps}
    />
  );
};

export const AppFormTextInput: React.FC<TextInputProps> = (props) => {

  const formContext = useFormContext();

  if (!formContext) {
    console.error('TextInput must be wrapped by the FormProvider');
    return null;
  }
  if (!props.name) {
    console.error('Name must be defined for TextInput');
    return null;
  }

  return <ControlledInput {...props} />;

};