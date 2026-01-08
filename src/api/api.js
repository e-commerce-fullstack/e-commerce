import axios from "axios";
import { useAuthStore } from "@/stores/authStore.js";

const api = axios.create({
  // Fallback ensures it always hits the backend container port
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api/v1',
});

// Attach access token to requests
api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  
  // Skip adding token for public routes
  const publicRoutes = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];
  const isPublic = publicRoutes.some(route => config.url.includes(route));

  if (isPublic) {
    return config;
  }

  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

// Handle 401 (token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore();
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await auth.refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); 
      } catch (err) {
        await auth.logoutUser();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;