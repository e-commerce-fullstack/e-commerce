<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore.js';
import { usePaymentStore } from '@/stores/paymentStore.js';
import { storeToRefs } from 'pinia';
import QrcodeVue from 'qrcode.vue';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft, RefreshCw } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
const paymentStore = usePaymentStore();

const { qrString, paymentStatus } = storeToRefs(paymentStore);
const { currentOrder } = storeToRefs(orderStore); 

const isLoading = ref(true);
const errorMessage = ref('');

// Helper to format currency safely
const formattedTotal = computed(() => {
  return currentOrder.value?.total ? currentOrder.value.total.toFixed(2) : '0.00';
});

const loadPaymentData = async () => {
  const orderId = route.params.id;
  try {
    isLoading.value = true;
    errorMessage.value = '';
    
    // 1. Fetch order details from Gateway
    await orderStore.fetchOrderById(orderId); 
    
    if (!currentOrder.value) {
      throw new Error("Order details not found.");
    }

    // 2. If already paid, skip to success
    if (currentOrder.value.paymentStatus === 'paid') {
      paymentStatus.value = 'PAID';
      handleSuccess(orderId);
      return;
    }

    // 3. Initialize Payment (Triggers the Python service call via Gateway)
    // We pass orderId and total as expected by your Gateway POST /payments
    await paymentStore.initPayment(currentOrder.value._id, currentOrder.value.total);
    
    // 4. Start Polling the status
    paymentStore.startPolling(() => {
      handleSuccess(orderId);
    });

  } catch (err) {
    console.error("Payment setup failed:", err);
    errorMessage.value = err.response?.data?.message || err.message || "Could not generate KHQR.";
  } finally {
    isLoading.value = false;
  }
};

const handleSuccess = (orderId) => {
  setTimeout(() => {
    router.push({ name: 'payment-success', params: { id: orderId } });
  }, 2000);
};

onMounted(loadPaymentData);

onUnmounted(() => {
  paymentStore.stopPolling();
  // Clean up state so the next order doesn't show old data
  paymentStore.$reset(); 
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] p-4 bg-slate-50/50">
    <Card class="w-full max-w-md border-none shadow-2xl overflow-hidden">
      <CardHeader :class="[
        'text-center transition-colors duration-500',
        paymentStatus === 'PAID' ? 'bg-green-50' : 'bg-white'
      ]">
        <CardTitle class="text-2xl font-bold">
          {{ paymentStatus === 'PAID' ? 'Payment Successful' : 'Scan KHQR to Pay' }}
        </CardTitle>
        <p v-if="paymentStatus !== 'PAID'" class="text-sm text-muted-foreground">
          Order #{{ route.params.id.slice(-6).toUpperCase() }}
        </p>
      </CardHeader>

      <CardContent class="flex flex-col items-center pt-6">
        <div v-if="isLoading" class="flex flex-col items-center py-12 space-y-4">
          <div class="relative">
            <Loader2 class="w-16 h-16 animate-spin text-primary" />
            <div class="absolute inset-0 flex items-center justify-center text-[10px] font-bold">KHQR</div>
          </div>
          <p class="text-muted-foreground animate-pulse">Contacting payment gateway...</p>
        </div>

        <div v-else-if="errorMessage" class="flex flex-col items-center py-8 space-y-4 text-center">
          <div class="p-3 bg-red-100 rounded-full">
            <AlertCircle class="w-10 h-10 text-destructive" />
          </div>
          <div class="space-y-2">
            <p class="font-semibold text-destructive">Payment Initialization Failed</p>
            <p class="text-sm text-muted-foreground px-6">{{ errorMessage }}</p>
          </div>
          <div class="flex gap-3 w-full px-6 pt-4">
            <Button variant="outline" class="flex-1" @click="router.push('/checkout')">
              <ArrowLeft class="w-4 h-4 mr-2" /> Back
            </Button>
            <Button class="flex-1" @click="loadPaymentData">
              <RefreshCw class="w-4 h-4 mr-2" /> Retry
            </Button>
          </div>
        </div>

        <div v-else-if="paymentStatus === 'PAID'" class="flex flex-col items-center py-12 space-y-4 text-green-600">
          <div class="p-4 bg-green-100 rounded-full">
            <CheckCircle2 class="w-16 h-16 animate-in zoom-in duration-300" />
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-slate-800">Paid successfully!</p>
            <p class="text-muted-foreground">Redirecting to your receipt...</p>
          </div>
        </div>

        <div v-else-if="qrString" class="flex flex-col items-center w-full space-y-8">
          <div class="relative p-2 bg-white border-4 border-primary/10 rounded-2xl shadow-inner">
            <qrcode-vue :value="qrString" :size="260" level="H" render-as="svg" class="rounded-lg" />
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-10 h-10 bg-white p-1 rounded-md shadow-sm border text-[8px] font-bold flex items-center justify-center text-primary">BAKONG</div>
            </div>
          </div>
          
          <div class="text-center bg-slate-100 w-full py-4 rounded-xl">
            <p class="text-xs uppercase font-semibold text-slate-500">Pay Exactly</p>
            <p class="text-4xl font-black text-primary">
              ${{ formattedTotal }}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter v-if="qrString && paymentStatus === 'PENDING' && !isLoading" class="flex flex-col items-center pb-8 pt-2">
        <div class="flex items-center space-x-3 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
          <Loader2 class="w-4 h-4 animate-spin text-primary" />
          <span class="text-xs font-medium text-primary">Waiting for Bakong confirmation...</span>
        </div>
        <button @click="router.push('/orders')" class="mt-6 text-sm text-muted-foreground hover:underline">
          Cancel and pay later
        </button>
      </CardFooter>
    </Card>
  </div>
</template>