import axios from 'axios';
import sharedPref from '@app/services/storage';


const appAxios = axios.create({
  // baseURL: API.BASE_URL,
});


// All request from axios
appAxios.interceptors.request.use(async config => {
  const access_token = sharedPref.getString('access_token');
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

//All response from axios
appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log('Error Refreshing Token');
      }
    }

    if (error.response && error.response.status != 401) {
      const errorMessage = error.response.data.msg || 'something went wrong';
      console.log('ERROR from Axios===> ', errorMessage);
    }
    return Promise.reject(error);
  },
);

export const refresh_tokens = async () => {
  try {
    const refresh_token = sharedPref.getString('refresh_token');
    const response = await axios.post('REFRESH_TOKEN_PATH', {
      refresh_token,
    });
    const new_access_token = response.data.access_token;
    const new_refresh_token = response.data.refresh_token;
    sharedPref.set('access_token', new_access_token);
    sharedPref.set('refresh_token', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('REFRESH TOKEN ERROR');
    sharedPref.clearAll();
    // resetAndNavigate('LoginScreen');
  }
};

export default appAxios;