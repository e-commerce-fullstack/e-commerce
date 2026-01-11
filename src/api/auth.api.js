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
export const logout = async () => {
  const res = await api.post(`/auth/logout`);
  return res.data;
};

// Refresh access token (send refresh token in body)
export const refresh = async (refreshToken) => {
  const res = await api.post(`/auth/refresh`, { refreshToken });
  return res.data; // { accessToken: '...' }
};
