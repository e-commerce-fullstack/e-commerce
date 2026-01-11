import axios from "axios";
import { useAuthStore } from "@/stores/authStore.js";

const api = axios.create({
  // Fallback ensures it always hits the backend container port
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
});

// Attach access token to requests
api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  
  // Skip adding token for public routes
  const publicRoutes = ["/auth/login", "/auth/register"];
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
api.interceptors.request.use((config) => {
  // 1. Get token from Store
  const auth = useAuthStore();
  let token = auth.accessToken;

  // 2. Backup: If store is empty (e.g. on page refresh), check LocalStorage
  if (!token) {
    token = localStorage.getItem("accessToken"); // Make sure the key matches your login save key
  }

  const publicRoutes = ["/auth/login", "/auth/register"];
  const isPublic = publicRoutes.some(route => config.url.includes(route));

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Interceptor added token to:", config.url); // Debug log
  } else {
    console.log("Interceptor SKIPPED token for:", config.url); // Debug log
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;