import { defineStore } from "pinia";
import { ref } from "vue";
import { login, register, logout } from "../api/auth.api.js"; // match export names

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
      console.error("Store Register Error:", error);
      throw error; // pass error to the component
    }
  }

  function logoutUser() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  }

  return { user, token, loginUser, logoutUser , registerUser};
});
