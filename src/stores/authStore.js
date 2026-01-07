import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api/api.js";
import { login, register, logout, refresh } from "../api/auth.api.js";

export const useAuthStore = defineStore("auth", () => {
  // 1. Initialize user from localStorage to persist role on refresh
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const accessToken = ref(localStorage.getItem("accessToken") || null);
  const refreshTokenValue = ref(localStorage.getItem("refreshToken") || null);

  // Login and store access token
  async function loginUser(credentials) {
    try {
      const data = await login(credentials);
      user.value = data.user; // This now includes the role from your backend change
      accessToken.value = data.accessToken;
      refreshTokenValue.value = data.refreshToken;

      // 2. Save user object to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (err) {
      console.error("Login Error:", err);
      throw err;
    }
  }

  // Register user
  async function registerUser(userData) {
    try {
      return await register(userData);
    } catch (err) {
      console.error("Register Error:", err);
      throw err;
    }
  }

  // Logout user
  async function logoutUser() {
    // ... logic ...
    user.value = null;
    accessToken.value = null;
    refreshTokenValue.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user"); // 3. Clear user on logout
    localStorage.removeItem("cart");
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => !!accessToken.value);

  // Set access token manually (after refresh)
  function setAccessToken(token) {
    accessToken.value = token;
  }

  // Refresh access token using httpOnly refresh token
  async function refreshAccessToken() {
    try {
      if (!refreshTokenValue.value)
        throw new Error("No refresh token available");
      const data = await refresh(refreshTokenValue.value); // send token in body
      accessToken.value = data.accessToken;
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } catch (err) {
      console.error("Refresh Token Error:", err);
      await logoutUser();
      throw err;
    }
  }

  // Verify token by calling /auth/me
  async function verifyToken() {
    if (!accessToken.value) return logoutUser();
    try {
      const { data } = await api.get("/auth/me");
      user.value = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      await logoutUser();
    }
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    refreshTokenValue,
    loginUser,
    registerUser,
    logoutUser,
    setAccessToken,
    refreshAccessToken,
    verifyToken,
  };
});
