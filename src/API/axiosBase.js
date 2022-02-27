import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:5001/api",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => error.response
);

export default axiosInstance;
