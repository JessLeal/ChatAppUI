import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('Token');
  const tokenJson = token ? await JSON.parse(token) : null;
  config.headers.Authorization = tokenJson ? `Bearer ${tokenJson.token}` : '';
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => error.response
);

export default axiosInstance;
