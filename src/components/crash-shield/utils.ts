import {navigationRef} from '@app/navigation/NavigationService';
import {getRequests} from 'react-native-network-logger';

export const createUniqueId = (): string => {
  return new Date(Math.ceil(Math.random() * 1e13)).valueOf().toString(36);
};

export const sendCrashReport = (
  err: Error,
  isFatal: boolean,
  type: string,
  crashId: string = createUniqueId()
): void => {
  if (!err) return;

  const routeAllHistory = navigationRef.current?.getState();
  const crashPage = navigationRef.current?.getCurrentRoute();
  const apiHistory = getRequests();
  const crashData = {
    error: err.message,
    stack: err.stack,
    routeAllHistory,
    crashPage,
    apiHistory,
    isFatal,
    type,
    crashId,
  };
  console.log('crashData======> ', crashData);

  //  Send the error to your server
  // axios.post('https://your-server-url.com/crash-reports', crashData)
  // .catch((e) => console.log('Failed to send crash report', e));

  // For Crashlytics -> Log custom error with Firebase Crashlytics
  // crashlytics().recordError(err);
  // crashlytics().setAttributes({
  //   routeAllHistory: JSON.stringify(routeAllHistory),
  //   crashPage: JSON.stringify(crashPage),
  //   apiHistory: JSON.stringify(apiHistory),
  //   isFatal: String(isFatal),
  //   type: String(type),
  //   crashId: crashId,
  // });
};
