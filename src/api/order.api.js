// order.api.js
import api from "./api.js";

// Create order
export const createOrder = async (payload) => {
  const res = await api.post("/order", payload); // interceptor adds token
  return res.data;
};

// Get all orders
export const getOrders = async () => {
  const res = await api.get("/order"); // interceptor adds token
  return res.data;
};

// Get order by ID
export const getOrdersById = async (orderId) => {
  const res = await api.get(`/order/${orderId}`); // interceptor adds token
  return res.data;
};
