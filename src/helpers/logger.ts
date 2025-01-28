type LogParams = any[]; // Define a type alias for optional parameters

export const consoleLog = (message: string, ...optionalParams: LogParams): void => {
  if (__DEV__) {
    console.log(`[LOG]-${Date.now()}: ${message}`, ...optionalParams);
  }
};

export const consoleError = (message: string, ...optionalParams: LogParams): void => {
  if (__DEV__) {
    console.error(`[ERROR]-${Date.now()}: ${message}`, ...optionalParams);
  }
};

export const consoleWarn = (message: string, ...optionalParams: LogParams): void => {
  if (__DEV__) {
    console.warn(`[WARN]-${Date.now()}: ${message}`, ...optionalParams);
  }
};
