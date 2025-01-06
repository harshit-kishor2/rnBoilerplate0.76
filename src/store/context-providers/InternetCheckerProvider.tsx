import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {AppSnackbar} from '@app/components';

interface InternetCheckerContextProps {
  isConnected: boolean; // Current connection status
}

interface InternetCheckerProviderProps {
  children: ReactNode; // Child components
  isPopupEnable?: boolean; // Whether to use popup mode
}

const InternetCheckerContext = createContext<InternetCheckerContextProps | undefined>(undefined);

export const InternetCheckerProvider: React.FC<InternetCheckerProviderProps> = ({
  children,
  isPopupEnable = true,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(true); // Initial connection state
  const [showSnackbar, setShowSnackbar] = useState(false); // Controls Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarColor, setSnackbarColor] = useState('black'); // Snackbar background color

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const newConnectionStatus = state.isConnected || false;
      console.log('newConnectionStatus', newConnectionStatus)
      if (newConnectionStatus !== isConnected) {
        // Connection restored
        if (newConnectionStatus) {
          setSnackbarMessage('You are back online! 🎉');
          setSnackbarColor('green');
        } else {
          // Connection lost
          setSnackbarMessage('You are offline. 😢');
          setSnackbarColor('red');
        }

        setShowSnackbar(true);
      }

      setIsConnected(newConnectionStatus);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDismissSnackbar = () => {
    setShowSnackbar(false); // Hides the Snackbar
  };

  return (
    <>
      <InternetCheckerContext.Provider value={{ isConnected }}>
        {children}
      </InternetCheckerContext.Provider>

      {/* Display Snackbar only if not in popup mode */}
      {isPopupEnable && (
        <AppSnackbar
          message={snackbarMessage}
          visible={showSnackbar}
          duration={3000}
          position="top"
          backgroundColor={snackbarColor}
          textColor="white"
          onDismiss={handleDismissSnackbar}
        />
      )}
    </>
  );
};

export const useInternetChecker = (): InternetCheckerContextProps => {
  const context = useContext(InternetCheckerContext);
  if (!context) {
    throw new Error('useInternetChecker must be used within an InternetCheckerProvider');
  }
  return context;
};
