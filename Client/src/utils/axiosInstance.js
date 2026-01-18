import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add a request interceptor to include JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    // Don't add token to login/register endpoints
    if (
      !config.url?.includes("/auth/login") &&
      !config.url?.includes("/auth/register")
    ) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
export { axiosInstance };
