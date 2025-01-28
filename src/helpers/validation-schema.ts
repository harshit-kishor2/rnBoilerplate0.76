import {z, ZodType} from 'zod';

export const ZodValidationConst = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Enter a valid email',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  PASSWORD_MAX_LENGTH: 'Password must be at most 20 characters',
  PASSWORD_MISMATCH: 'Passwords do not match',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm Password is required',
  CONFIRM_PASSWORD_MIN_LENGTH: 'Confirm Password must be at least 6 characters',
  CONFIRM_PASSWORD_MAX_LENGTH: 'Confirm Password must be at most 20 characters',
};

export const LoginSchema: ZodType<LoginFormData> = z
  .object({
    email: z
      .string({required_error: ZodValidationConst.EMAIL_REQUIRED})
      .trim()
      .nonempty(ZodValidationConst.EMAIL_REQUIRED)
      .email(ZodValidationConst.EMAIL_INVALID),
    password: z
      .string({required_error: ZodValidationConst.PASSWORD_REQUIRED})
      .trim()
      .nonempty(ZodValidationConst.PASSWORD_REQUIRED)
      .min(6, ZodValidationConst.PASSWORD_MIN_LENGTH)
      .max(20, ZodValidationConst.PASSWORD_MAX_LENGTH),
  });

export const RegisterSchema: ZodType<RegisterFormData> = z
  .object({
    email: z
      .string({required_error: ZodValidationConst.EMAIL_REQUIRED})
      .trim()
      .nonempty(ZodValidationConst.EMAIL_REQUIRED)
      .email(ZodValidationConst.EMAIL_INVALID),
    password: z
      .string({required_error: ZodValidationConst.PASSWORD_REQUIRED})
      .trim()
      .nonempty(ZodValidationConst.PASSWORD_REQUIRED)
      .min(6, ZodValidationConst.PASSWORD_MIN_LENGTH)
      .max(20, ZodValidationConst.PASSWORD_MAX_LENGTH),
    confirmPassword: z
      .string({required_error: ZodValidationConst.CONFIRM_PASSWORD_REQUIRED})
      .nonempty(ZodValidationConst.CONFIRM_PASSWORD_REQUIRED)
  }).refine((data) => data.password === data.confirmPassword, {
    message: ZodValidationConst.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });