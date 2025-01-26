import React from 'react';
import {Alert} from 'react-native';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';
import {createUniqueId, sendCrashReport} from './utils';
import ErrorBoundary from './ErrorBoundary';


interface ICrashShieldProps {
  children: React.ReactNode;
}

const CrashShield: React.FC<ICrashShieldProps> = ({children}) => {
  const crashId = React.useMemo(() => createUniqueId(), []);

  const errorHandler = (err: Error, isFatal: boolean, type: string) => {
    sendCrashReport(err, isFatal, type, crashId);
  };

  const handleJSException = (error: Error, isFatal: boolean): void => {
    console.log('From JS Handler:', {crashId});
    errorHandler(error, isFatal, 'JS');
    if (isFatal) {
      Alert.alert(
        'Unexpected Error Occurred',
        `Error: ${error.name}\n${error.message}\n\nThe app will restart.`,
        [{text: 'Restart', onPress: () => RNRestart.Restart()}]
      );
    }
  };

  const handleNativeException = (errorString: string): void => {
    console.log('From Native Exception handler:', errorString);
    errorHandler(new Error(errorString), true, 'Native');
    RNRestart.Restart();
  };

  setJSExceptionHandler(handleJSException, true);
  setNativeExceptionHandler(handleNativeException);

  return (
    <ErrorBoundary
      onError={(error: Error, stackTrace: string, type: string) => sendCrashReport(error, true, type, crashId)}
      errorCode={crashId}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CrashShield;