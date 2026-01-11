<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <div class="mb-8">
      <router-link to="/order"
        class="text-sm text-indigo-600 hover:underline flex items-center gap-1 mb-2 font-semibold">
        ← Back to Orders
      </router-link>
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Complete Payment</h1>
      <p class="text-slate-500 mt-2">Please scan the QR code and provide your transaction details.</p>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-slate-500 font-medium">Loading order details...</p>
    </div>

    <div v-else-if="!order" class="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
      <p class="text-red-600 font-bold text-lg">Order not found.</p>
      <router-link to="/order" class="mt-4 inline-block text-indigo-600 font-medium underline">Return to
        History</router-link>
    </div>

    <div v-else class="space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Amount</span>
          <span class="text-3xl font-black text-indigo-600">${{ order.total.toFixed(2) }}</span>
        </div>
        <div
          class="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
          <span>Order ID: <span class="font-mono font-bold">#{{ order._id.toUpperCase() }}</span></span>
          <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">{{ order.status
            }}</span>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="p-8 text-center bg-slate-50/50 border-b border-slate-100">
          <h3 class="font-extrabold text-slate-900 mb-4 text-xl tracking-tight">Scan KHQR to Pay</h3>

          <div class="inline-block p-4 bg-white rounded-2xl border-4 border-white shadow-xl">
            <img src="../../../../public/khqr.png" alt="KHQR Code" class="w-64 h-64 object-contain mx-auto" />
          </div>

          <div class="mt-6 space-y-2">
            <p class="text-sm font-bold text-slate-700">Accepting ABA, Bakong, and all local banks</p>
            <p class="text-xs text-slate-400 max-w-xs mx-auto">Make sure the name on the account matches our store name.
            </p>
          </div>
        </div>

        <div class="p-8">
          <div v-if="!isSubmitted">
            <form @submit.prevent="handlePaymentSubmit" class="space-y-5">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Transaction ID / Reference Number</label>
                <input v-model="transactionId" type="text" placeholder="Paste the reference number from bank app"
                  required
                  class="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none font-medium" />
              </div>

              <button type="submit" :disabled="submitting"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-100 active:scale-[0.98]">
                <span v-if="submitting" class="flex items-center justify-center gap-2">
                  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting...
                </span>
                <span v-else>Confirm I Have Paid</span>
              </button>
            </form>
            <p class="text-xs text-center text-slate-400 mt-6 leading-relaxed">
              By clicking confirm, you agree that you have sent the exact amount shown above. Fraudulent submissions
              will result in order cancellation.
            </p>
          </div>

          <div v-else class="text-center py-6">
            <div class="flex justify-center mb-6">
              <div class="relative">
                <div class="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div class="relative rounded-full bg-yellow-50 p-5 border-2 border-yellow-100">
                  <svg class="w-10 h-10 text-yellow-600 animate-spin" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 class="font-black text-2xl text-slate-900 mb-2">Verifying Payment...</h3>
            <p class="text-slate-500 max-w-xs mx-auto leading-relaxed">
              We are checking your transaction <strong>{{ transactionId }}</strong>.
              This page will refresh automatically once approved.
            </p>
            <button @click="isSubmitted = false" class="mt-8 text-sm text-slate-400 hover:text-indigo-600 font-medium">
              Entered wrong ID? Click to edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore';
import { submitKHQRPayment } from '@/api/payment.api';
import api from '@/api/api.js'
// --- State ---
const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const order = ref(null);
const loading = ref(true);
const submitting = ref(false);
const isSubmitted = ref(false); // Controls the "Waiting" UI
const transactionId = ref('');

let statusInterval = null;

// --- Hooks ---
onMounted(async () => {
  const orderId = route.params.id;
  try {
    order.value = await orderStore.fetchOrderById(orderId);

    // Safety check: if order is already paid, go home
    if (order.value?.status === 'paid') {
      router.push('/order');
    }
  } catch (err) {
    console.error("Error loading order:", err);
  } finally {
    loading.value = false;
  }
});

// Clear interval when user leaves page to prevent memory leaks
onUnmounted(() => {
  if (statusInterval) clearInterval(statusInterval);
});

// --- Actions ---
const handlePaymentSubmit = async () => {
  if (!transactionId.value) {
    alert("Please enter the Reference Number from your bank app.");
    return;
  }

  submitting.value = true;
  try {
    await submitKHQRPayment(
      order.value._id,
      transactionId.value,
      order.value.total
    );

    // Switch to "Waiting" state and start polling
    isSubmitted.value = true;
    startPolling(order.value._id);

  } catch (err) {
    // Check if the backend sent a "Duplicate Key" error (400 or 500)
    const errorMsg = err.response?.data?.message || err.message;
    
    if (errorMsg.includes("E11000") || errorMsg.includes("duplicate")) {
      alert("This Reference Number has already been submitted. Please check your bank receipt and try again.");
    } else {
      alert(errorMsg || "Failed to submit. Please try again.");
    }
  } finally {
    submitting.value = false;
  }
};

const startPolling = (orderId) => {
  const timer = setInterval(async () => {
    try {
      const res = await api.get(`/order/${orderId}`);
      // Check for the new field we added to the Order Schema
      if (res.data.paymentStatus === 'paid') {
        clearInterval(timer);
        router.push('/payment-success'); // Redirect to success page
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  }, 5000); // Check every 5 seconds
};
</script>

<style scoped>
/* Optional: Smooth transition for state changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>