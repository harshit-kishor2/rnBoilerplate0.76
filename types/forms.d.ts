interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  confirmPassword: string;
}