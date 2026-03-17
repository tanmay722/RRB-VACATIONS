import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
