import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { login, register, logout } from "../api/auth.api.js"; // match export names
import api from '@/api/api.js'

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);

  // Wrap the imported `login` function
  async function loginUser(credentials) {
    try {
      const data = await login(credentials); // call imported login
      user.value = data.user;
      token.value = data.token;
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Store Login Error:", error);
      throw error; // pass error to component
    }
  }

  async function registerUser(userData) {
    try {
      const data = await register(userData);
      return data;
    } catch (err) {
      console.error("Store Register Error:", err);
      throw err; // pass error to the component
    }
  }

  function logoutUser() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  }

  // check token existence and expiration
  const isAuthenticated = computed(() => {
    if (!token.value) return false;
    try {
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  });

  // keep localStorage in sync automatically
  watch(token, (newVal) => {
    if (newVal) localStorage.setItem("token", newVal);
    else localStorage.removeItem("token");
  });

  function setToken(newToken) {
    token.value = newToken;
  }

  // verify token by calling /auth/me
  async function verifyToken() {
    if (!token.value) return logoutUser();
    try {
      const { data } = await api.get("/auth/me");
      user.value = data.user;
    } catch {
      logoutUser(); // token invalid → clear token
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    loginUser,
    logoutUser,
    registerUser,
    setToken,
    verifyToken,
  };
});
