import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const getToken = () => {
  return localStorage.getItem("token") ?? "";
};

const axiosInstance = setupCache(
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  }),
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (["post", "patch", "delete"].includes(config.method)) {
      config.headers.Authorization = `Bearer ${token.replace(/^"(.*)"$/, "$1")}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
