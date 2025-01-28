type LogParams = any[]; // Define a type alias for optional parameters

const isDev = __DEV__; // React Native's global variable

const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString(); // Example: 2025-01-28T10:30:15.123Z
};

export const consoleLog = (message: string, ...optionalParams: LogParams): void => {
  if (isDev) {
    console.log(`🌟 [LOG: ${getTimestamp()}] :: ${message}`, ...optionalParams);
  }
};

export const consoleError = (message: string, ...optionalParams: LogParams): void => {
  if (isDev) {
    console.error(`❌ [ERROR: ${getTimestamp()}] :: ${message}`, ...optionalParams);
  }
};

export const consoleWarn = (message: string, ...optionalParams: LogParams): void => {
  if (isDev) {
    console.warn(`⚠️ [WARN: ${getTimestamp()}] :: ${message}`, ...optionalParams);
  }
};
