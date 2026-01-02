import axios from "axios";
import { useAuthStore } from "@/stores/authStore.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(config => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`; // ✅ send token
  }
  return config;
});

export default api;
