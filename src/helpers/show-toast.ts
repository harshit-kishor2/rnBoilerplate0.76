import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info'; // Allowed toast types

interface ShowToastOptions {
  text2?: string; // Optional secondary text
  visibilityTime?: number; // Duration in ms
  autoHide?: boolean; // Whether to auto hide after visibilityTime
  topOffset?: number; // Top space
  bottomOffset?: number; // Bottom space
}

export const showToast = (type: ToastType, message: string, options: ShowToastOptions = {}) => {
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



// For success toast
// showToast('success', 'Your action was successful!');

// For error toast
// showToast('error', 'An error occurred.', { text2: 'Please try again.' });

// For info toast
// showToast('info', 'This is some information.');