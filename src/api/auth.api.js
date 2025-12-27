import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login
export const login = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return res.data;
};

// Register
export const register = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, userData);
  return res.data;
};

// Logout
export const logout = async (token) => {
  const res = await axios.post(`${BASE_URL}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
