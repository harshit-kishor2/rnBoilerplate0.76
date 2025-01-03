import storage, {storageKeys} from '@app/services/storage';
import axios from 'axios';

const BASE_URL = 'https://api.example.com'; // Replace with your API base URL
const REFRESH_TOKEN_PATH = '/auth/refresh';
const TIMEOUT = 10000;  // 10 seconds timeout

// Create Axios Instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    try {
      const access_token = storage.getString(storageKeys.access_token);
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    } catch (error) {
      console.error('Error adding Authorization header:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(new Error(error.message));
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses
  async (error) => {
    if (error.response) {
      const {status} = error.response;
      if (status === 401 && !error.config._retry) {
        // Attempt to refresh token
        error.config._retry = true;
        const newAccessToken = await refresh_tokens();
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
export const refresh_tokens = async (): Promise<string | null> => {
  try {
    const refresh_token = storage.getString(storageKeys.refresh_token);
    if (!refresh_token) {
      throw new Error('No refresh token available.');
    }
    const response = await axios.post(REFRESH_TOKEN_PATH, {
      refresh_token,
    });
    const {access_token, refresh_token: new_refresh_token} = response.data;
    storage.set(storageKeys.access_token, access_token);
    storage.set(storageKeys.refresh_token, new_refresh_token);
    return access_token;
  } catch (error) {
    console.error('Token Refresh Error:', error);
    return null;
  }
};

// Logout Logic
const handleLogout = async () => {
  try {
    storage.clearAll(); // Clear all stored data
    console.error('Session Expired', 'You have been logged out.');
    // Clear all stored data
    // Navigate to LoginScreen or restart the app
    // e.g., resetAndNavigate('LoginScreen');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default apiClient;
