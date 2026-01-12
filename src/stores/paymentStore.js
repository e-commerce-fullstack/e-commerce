import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as paymentApi from '@/api/payment.api.js';

export const usePaymentStore = defineStore('payment', () => {
  // --- State ---
  const qrString = ref(null);
  const md5 = ref(null);
  const paymentStatus = ref('IDLE'); // IDLE, PENDING, PAID, ERROR
  const pollInstance = ref(null);
  const error = ref(null); // Added to track specific error messages

  // --- Actions ---

  /**
   * Initialize payment and generate QR string
   */
  const initPayment = async (orderId, amount) => {
    resetPaymentState(); // Ensure we start with a clean state
    paymentStatus.value = 'PENDING';
    try {
      const response = await paymentApi.submitKHQRPayment(orderId, amount);
      
      // Handle the nested data structure from your FastAPI/Gateway
      const { qrString: qr, md5: hash } = response.data; 
      
      qrString.value = qr;
      md5.value = hash.toLowerCase().trim();
      return response.data;
    } catch (err) {
      paymentStatus.value = 'ERROR';
      error.value = err.message || "Failed to generate QR Code";
      throw err;
    }
  };

  /**
   * Stop any active polling
   */
  const stopPolling = () => {
    if (pollInstance.value) {
      clearInterval(pollInstance.value);
      pollInstance.value = null;
    }
  };

  /**
   * Start automated polling to verify payment
   */
  const startPolling = (onSuccess) => {
    stopPolling(); // Safety check

    pollInstance.value = setInterval(async () => {
      try {
        if (!md5.value) return;

        const res = await paymentApi.getPaymentStatusByMd5(md5.value);
        
        // Match the status string exactly as returned by your FastAPI backend
        if (res.status === 'PAID') {
          paymentStatus.value = 'PAID';
          stopPolling();
          if (onSuccess) onSuccess();
        }
      } catch (err) {
        // We don't change status to ERROR here because a 404 or timeout 
        // during polling just means "not paid yet."
        console.warn("Bakong Polling: Still waiting...");
      }
    }, 5000);
  };

  /**
   * Reset store to initial state
   */
  const resetPaymentState = () => {
    stopPolling();
    qrString.value = null;
    md5.value = null;
    paymentStatus.value = 'IDLE';
    error.value = null;
  };

  return {
    qrString,
    md5,
    paymentStatus,
    error,
    initPayment,
    startPolling,
    stopPolling,
    resetPaymentState
  };
});