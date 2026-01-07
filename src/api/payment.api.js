import api from "./api"; // Import your configured axios instance

export const submitKHQRPayment = async (orderId, transactionId, amount) => {
  try {
    const response = await api.post("/payments/khqr", {
      orderId,
      transactionId,
      amount,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPaymentStatus = async (orderId) => {
  try {
    const response = await api.get(`/payments/order/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// This one is for your Admin Panel later
export const verifyPaymentAdmin = async (transactionId) => {
  try {
    const response = await api.post("/payments/verify", { transactionId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};