import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { login, register, logout, refresh, getMe } from "../api/auth.api.js";

export const useAuthStore = defineStore("auth", () => {
  // --- STATE ---
  // Initialize state from localStorage to persist data across page refreshes
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const accessToken = ref(localStorage.getItem("accessToken") || null);
  const refreshTokenValue = ref(localStorage.getItem("refreshToken") || null);
  const isLoading = ref(false);

  // --- GETTERS ---
  const isAuthenticated = computed(() => !!accessToken.value);
  const userRole = computed(() => user.value?.role || 'guest');

  // --- ACTIONS ---

  /**
   * Login User and store session
   */
  async function loginUser(credentials) {
    isLoading.value = true;
    try {
      const data = await login(credentials);
      
      // Update Reactive State
      user.value = data.user;
      accessToken.value = data.accessToken;
      refreshTokenValue.value = data.refreshToken;

      // Persist to LocalStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      
      return data;
    } catch (err) {
      console.error("Store: Login Error", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Register User
   */
  async function registerUser(userData) {
    isLoading.value = true;
    try {
      return await register(userData);
    } catch (err) {
      console.error("Store: Register Error", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Verify session with Backend (Calls /auth/me via Gateway)
   */
  async function verifyToken() {
    if (!accessToken.value) return;

    try {
      const data = await getMe(); // Uses auth.api.js function
      user.value = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      // If Gateway returns 401, the token is invalid/expired
      if (err.response?.status === 401) {
        console.warn("Session expired. Logging out...");
        await logoutUser();
      } else {
        // If 502/503/504, the Auth service is down but user might still be valid
        // note error
        console.error("Auth Service currently unreachable.");
      }
    }
  }

  /**
   * Refresh the Access Token
   */
  async function refreshAccessToken() {
    try {
      if (!refreshTokenValue.value) throw new Error("No refresh token");
      
      const data = await refresh(refreshTokenValue.value);
      accessToken.value = data.accessToken;
      localStorage.setItem("accessToken", data.accessToken);
      
      return data.accessToken;
    } catch (err) {
      console.error("Store: Token Refresh Failed", err);
      await logoutUser();
      throw err;
    }
  }

  /**
   * Logout and clear all storage
   */
  async function logoutUser() {
    try {
      // Notify backend to invalidate tokens if possible
      if (accessToken.value) {
        await logout();
      }
    } catch (err) {
      console.warn("Server logout failed, clearing local state anyway.");
    } finally {
      // Wipe state
      user.value = null;
      accessToken.value = null;
      refreshTokenValue.value = null;

      // Wipe Storage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Optional: localStorage.removeItem("cart");
    }
  }

  return {
    // State
    user,
    accessToken,
    refreshTokenValue,
    isLoading,
    // Getters
    isAuthenticated,
    userRole,
    // Actions
    loginUser,
    registerUser,
    verifyToken,
    refreshAccessToken,
    logoutUser
  };
});
