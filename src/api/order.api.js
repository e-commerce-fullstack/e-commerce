import api from "./api.js";

// Create a new order
export const createOrder = async (payload) => {
  // Get token directly from localStorage to be 100% sure
  const token = localStorage.getItem("accessToken"); 
  
  const res = await api.post("/orders", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }); 
  return res.data;
};

// Get all orders for the current user
export const getOrders = async () => {
  const res = await api.get("/orders"); 
  return res.data;
};

// Get a specific order detail
export const getOrderById = async (orderId) => {
  const res = await api.get(`/orders/${orderId}`); 
  return res.data;
};