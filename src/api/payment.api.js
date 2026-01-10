import api from "./api"; // Your axios instance configured with baseURL

/**
 * @desc    Submit payment request to generate a valid KHQR
 * @param   {String} orderId - The MongoDB ID of the order
 * @param   {Number} amount - The total cost (to ensure consistency with order)
 * @returns {Promise} - Resolves to { success: true, qrString: "...", md5: "..." }
 */
export const submitKHQRPayment = async (orderId, amount) => {
  try {
    // Standardizing data to match backend controller expectations
    const response = await api.post("/payment/khqr", {
      orderId,
      amount,
    });
    return response.data;
  } catch (error) {
    // Standardized error handling for Axios
    const errorMessage = error.response?.data?.message || error.message || "Failed to generate KHQR";
    throw new Error(errorMessage);
  }
};

/**
 * @desc    Check if a specific QR (via MD5) has been paid by polling the Bakong status
 * @param   {String} md5 - The MD5 hash returned from the submitKHQRPayment call
 * @returns {Promise} - Resolves to { success: Boolean, status: "PAID" | "PENDING" }
 */
export const getPaymentStatusByMd5 = async (md5) => {
  try {
    // The md5 is converted to lowercase to ensure consistency with DB records
    const searchMd5 = md5.toLowerCase().trim();
    
    // This calls the GET route: /api/payment/check-status/:md5
    const response = await api.get(`/payment/check-status/${searchMd5}`);
    return response.data;
  } catch (error) {
    // If payment is not found yet, we treat it as PENDING rather than crashing the UI
    if (error.response?.status === 404) {
      return { success: false, status: "PENDING" };
    }
    throw error.response?.data || error.message;
  }
};

/**
 * @desc    Backup check to see if the order itself has been marked as paid
 * @param   {String} orderId - The Order ID
 */
export const getOrderPaymentStatus = async (orderId) => {
  try {
    const response = await api.get(`/payment/order/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * @desc    Admin function to manually verify a transaction via Bakong Hash
 */
export const verifyPaymentAdmin = async (bankHash) => {
  try {
    const response = await api.post("/payment/verify", { hash: bankHash });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};