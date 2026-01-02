import api from "./api.js";

// Login
export const login = async (credentials) => {
  const res = await api.post(`/auth/login`, credentials);
  return res.data;
};

// Register
export const register = async (userData) => {
  const res = await api.post(`/auth/register`, userData);
  return res.data;
};

// Logout
export const logout = async (token) => {
  const res = await api.post(`$/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
