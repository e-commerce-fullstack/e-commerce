import api from "./api.js";

// Create order
export const createOrder = async (payload) => {
  // Changed /order to /orders
  const res = await api.post("/order", payload); 
  return res.data;
};

// Get all orders
export const getOrders = async () => {
  // Changed /order to /orders
  const res = await api.get("/order"); 
  return res.data;
};

// Get order by ID
export const getOrdersById = async (orderId) => {
  // Changed /order to /orders
  const res = await api.get(`/order/${orderId}`); 
  return res.data;
};