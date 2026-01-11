import api from "./api"; // Axios instance pointing to http://localhost:5000

/**
 * @desc    Submit payment request to generate a valid KHQR
 * @route   POST /payments/khqr
 */
export const submitKHQRPayment = async (orderId, total) => {
  try {
    // Standardized to match the Gateway route we created
    const response = await api.post("/payments", {
      orderId,
      total: Number(total) || 0,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Failed to generate KHQR";
    throw new Error(errorMessage);
  }
};

/**
 * @desc    Check if a specific QR has been paid (Polling)
 * @route   GET /payments/verify/:md5
 */
export const getPaymentStatusByMd5 = async (md5) => {
  try {
    const searchMd5 = md5.toLowerCase().trim();
    
    // Updated to match Gateway: /payments/verify/:md5
    const response = await api.get(`/payments/status/${searchMd5}`);
    return response.data;
  } catch (error) {
    // If the record isn't in DB yet or bank hasn't processed, return PENDING
    if (error.response?.status === 404) {
      return { success: false, status: "PENDING" };
    }
    return { success: false, status: "ERROR", message: error.message };
  }
};