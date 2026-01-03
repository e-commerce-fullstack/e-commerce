import axios from "axios";
import { useAuthStore } from "@/stores/authStore.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach access token to requests
api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  console.log("Interceptor token:", auth.accessToken);
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

// Response interceptor to handle 401 (token expired)
api.interceptors.response.use(
  (response) => response, // pass through success
  async (error) => {
    const auth = useAuthStore();
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await auth.refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // retry original request
      } catch (err) {
        // refresh failed → logout
        await auth.logoutUser();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
