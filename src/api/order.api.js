import api from "./api"; // BASE_URL = "https://api-9rgk.onrender.com/api/v1"

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};


// create order
export const createOrder = async (payload) => {
  // payload = { products: [...], total: 100, status: 'pending' }
  const res = await api.post(
    `/order`,
    payload, // send the object directly
    { headers: getAuthHeader() }
  );
  return res.data;
};


// Get all orders
export const getOrders = async () => {
  const res = await api.get(`order`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Get a single order by ID
export const getOrdersById = async (orderId) => {
  const res = await api.get(`/order/${orderId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
