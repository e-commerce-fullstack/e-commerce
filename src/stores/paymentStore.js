import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as paymentApi from '@/api/payment.api.js';

export const usePaymentStore = defineStore('payment', () => {
  // --- State (ref) ---
  const qrString = ref(null);
  const md5 = ref(null);
  const paymentStatus = ref('IDLE'); // IDLE, PENDING, PAID, ERROR
  const pollInstance = ref(null);

  // --- Actions (functions) ---

  /**
   * Initialize payment and generate QR string
   */
  const initPayment = async (orderId, amount) => {
    paymentStatus.value = 'PENDING';
    try {
      const data = await paymentApi.submitKHQRPayment(orderId, amount);
      qrString.value = data.qrString;
      // Ensure MD5 is normalized for the polling logic
      md5.value = data.md5.toLowerCase().trim();
      return data;
    } catch (error) {
      paymentStatus.value = 'ERROR';
      throw error;
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
    // Clear existing interval to avoid memory leaks
    stopPolling();

    pollInstance.value = setInterval(async () => {
      try {
        if (!md5.value) return;

        const res = await paymentApi.getPaymentStatusByMd5(md5.value);
        
        if (res.success && res.status === 'PAID') {
          paymentStatus.value = 'PAID';
          stopPolling();
          if (onSuccess) onSuccess();
        }
      } catch (err) {
        // Log for debugging but keep polling (status is likely still PENDING)
        console.log("Bakong: Polling for update...");
      }
    }, 3000);
  };

  /**
   * Reset store to initial state
   */
  const resetPaymentState = () => {
    stopPolling();
    qrString.value = null;
    md5.value = null;
    paymentStatus.value = 'IDLE';
  };

  // Return everything to be used in components
  return {
    qrString,
    md5,
    paymentStatus,
    initPayment,
    startPolling,
    stopPolling,
    resetPaymentState
  };
});