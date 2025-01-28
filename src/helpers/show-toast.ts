import Toast from 'react-native-toast-message';

export const ToastMessageConst = {
  UNDER_CONSTRUCTION: 'Under construction',
  UNDER_CONSTRUCTION_MSG: 'This feature is under construction',
  NO_INTERNET: 'No internet connection',
  INVALID_CREDENTIALS: 'Invalid credentials',
  GENERIC_ERROR: 'Something went wrong',
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Login failed',
  REGISTER_SUCCESS: 'Register successful',
  REGISTER_FAILED: 'Register failed',
  FORGOT_PASSWORD_SUCCESS: 'Password reset email sent',
  FORGOT_PASSWORD_FAILED: 'Failed to send password reset email',
  RESET_PASSWORD_SUCCESS: 'Password reset successful',
  RESET_PASSWORD_FAILED: 'Failed to reset password',
  VERIFY_EMAIL_SUCCESS: 'Email verification successful',
  VERIFY_EMAIL_FAILED: 'Email verification failed',
};

export type ToastType = 'success' | 'error' | 'info'; // Allowed toast types

export interface ShowToastOptions {
  text2?: string; // Optional secondary text
  visibilityTime?: number; // Duration in ms
  autoHide?: boolean; // Whether to auto hide after visibilityTime
  topOffset?: number; // Top space
  bottomOffset?: number; // Bottom space
}

const showToast = (type: ToastType, message: string, options: ShowToastOptions = {}) => {
  Toast.show({
    type, // Toast type: 'success', 'error', 'info'
    position: 'bottom', // Position of the toast
    text1: message, // Main message
    text2: options.text2 ?? '', // Secondary message (optional)
    visibilityTime: options.visibilityTime ?? 4000, // Duration for the toast
    autoHide: options.autoHide ?? true, // Whether it auto hides after visibilityTime
    topOffset: options.topOffset ?? 30, // Top offset
    bottomOffset: options.bottomOffset ?? 40, // Bottom offset
  });
};

export default showToast;