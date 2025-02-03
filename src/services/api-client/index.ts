import {
  ApiConst,
  appTokenLocalStorage,
  appTokenLocalStorageKeys,
} from './api-client-utils';
import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

// Create Axios Instance
const apiClient = axios.create({
  baseURL: ApiConst.BASE_URL,
  timeout: ApiConst.TIMEOUT,
});

// Logger for axios
apiClient.interceptors.request.use(
  AxiosLogger.requestLogger,
  AxiosLogger.errorLogger
);
apiClient.interceptors.response.use(
  AxiosLogger.responseLogger,
  AxiosLogger.errorLogger
);

// Request Interceptor
apiClient.interceptors.request.use(
  config => {
    try {
      const accessToken = appTokenLocalStorage.getString(
        appTokenLocalStorageKeys.access_token
      );
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error adding Authorization header:', error);
    }
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(new Error(error.message));
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  response => response, // Pass successful responses
  async error => {
    if (error.response) {
      const {status} = error.response;
      if (status === 401 && !error.config._retry) {
        // Attempt to refresh token
        error.config._retry = true;
        const newAccessToken = await refreshTokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(error.config); // Retry the original request
        } else {
          // Logout if token refresh fails
          handleLogout();
        }
      } else {
        // Handle other status codes
        handleApiError(error);
      }
    } else if (error.request) {
      console.error('No Response from Server:', error.request);
      console.error('Network Error', 'Please check your internet connection.');
    } else {
      console.error('Request Setup Error:', error.message);
      console.error('Error', 'An unexpected error occurred.');
    }
    return Promise.reject(new Error(error.message));
  }
);

// Global Error Handler Function
const handleApiError = (error: any) => {
  const {status, data} = error.response;
  const errorMessage = data?.message || 'An unexpected error occurred.';
  switch (status) {
    case 400:
      console.error('Bad Request', errorMessage);
      break;
    case 401:
      console.error('Unauthorized', 'Please log in again.');
      handleLogout();
      break;
    case 403:
      console.error('Forbidden', 'You do not have access to this resource.');
      break;
    case 404:
      console.error('Not Found', 'The requested resource could not be found.');
      break;
    case 500:
      console.error('Server Error', 'An internal server error occurred.');
      break;
    default:
      console.error('Error', errorMessage);
  }
};

// Refresh Token Logic
const refreshTokens = async (): Promise<string | null> => {
  try {
    const refreshToken = appTokenLocalStorage.getString(
      appTokenLocalStorageKeys.refresh_token
    );
    if (!refreshToken) {
      throw new Error('No refresh token available.');
    }
    const response = await axios.post(ApiConst.REFRESH_TOKEN_PATH, {
      refreshToken,
    });
    const {accessToken, refresh_token: newRefreshToken} = response.data;
    setAllApiTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error('Token Refresh Error:', error);
    return null;
  }
};

// Logout Logic
export const handleLogout = () => {
  try {
    appTokenLocalStorage.clearAll();
    console.log('Session Expired', 'You have been logged out.');
    // Clear all stored data
    // Navigate to LoginScreen or restart the app
    // e.g., resetAndNavigate('LoginScreen');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const setAllApiTokens = (accessToken: string, refreshToken: string) => {
  appTokenLocalStorage.set(
    appTokenLocalStorageKeys.refresh_token,
    refreshToken
  );
  appTokenLocalStorage.set(appTokenLocalStorageKeys.access_token, accessToken);
};

export const clearAllApiTokens = () => {
  appTokenLocalStorage.clearAll();
};

export default apiClient;
