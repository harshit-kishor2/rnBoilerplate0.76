import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface SnackbarProps {
  message: string; // Message to display
  visible: boolean; // Visibility state
  duration?: number; // Duration in ms (default 3000ms)
  position?: 'top' | 'bottom'; // Position of the Snackbar
  backgroundColor?: string; // Background color
  textColor?: string; // Text color
  actionText?: string; // Action button text
  onActionPress?: () => void; // Action button press handler
  onDismiss?: () => void; // Callback when Snackbar hides
}

const AppSnackbar: React.FC<SnackbarProps> = ({
  message,
  visible,
  duration = 3000,
  position = 'bottom',
  backgroundColor = 'black',
  textColor = 'white',
  actionText,
  onActionPress,
  onDismiss,
}) => {
  const translateY = useRef(new Animated.Value(100)).current; // Slide in/out animation

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-dismiss after `duration`
      const timer = setTimeout(() => {
        handleHide();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Slide out
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleHide = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) {
        onDismiss();
      }
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          transform: [{ translateY }],
          ...(position === 'top' ? styles.topPosition : styles.bottomPosition),
        },
      ]}
    >
      <Text style={[styles.message, { color: textColor }]}>{message}</Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={[styles.actionText, { color: textColor }]}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  topPosition: {
    top: 16,
  },
  bottomPosition: {
    bottom: 16,
  },
  message: {
    fontSize: 16,
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default AppSnackbar;
