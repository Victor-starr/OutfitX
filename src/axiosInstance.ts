import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL,
});

export default axiosInstance;
