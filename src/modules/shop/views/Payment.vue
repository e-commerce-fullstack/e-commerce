<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore.js';
import { usePaymentStore } from '@/stores/paymentStore.js';
import { storeToRefs } from 'pinia';
import QrcodeVue from 'qrcode.vue';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-vue-next'; // Added CheckCircle2

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
const paymentStore = usePaymentStore();

const { qrString, paymentStatus } = storeToRefs(paymentStore);
const { currentOrder } = storeToRefs(orderStore); 

const isLoading = ref(true);
const errorMessage = ref('');

onMounted(async () => {
  const orderId = route.params.id;
  try {
    isLoading.value = true;
    
    // 1. Fetch order
    await orderStore.fetchOrderById(orderId); 
    
    if (currentOrder.value) {
       // OPTIONAL: Check if already paid
       if (currentOrder.value.paymentStatus === 'paid') {
         router.push({ name: 'payment-success', params: { id: orderId } });
         return;
       }

       // 2. Initialize Payment
       await paymentStore.initPayment(currentOrder.value._id, currentOrder.value.total);
       
       // 3. Start Polling
       paymentStore.startPolling(() => {
         // This runs when paymentStatus becomes 'PAID'
         setTimeout(() => {
            router.push({ name: 'payment-success', params: { id: orderId } });
         }, 1500); // Small delay so user sees the "Success" UI
       });
    } else {
      errorMessage.value = "Order details not found.";
    }
  } catch (err) {
    console.error("Setup failed", err);
    errorMessage.value = err.message || "Could not generate payment.";
  } finally {
    isLoading.value = false;
  }
});

// Cleanup timer when user leaves
onUnmounted(() => {
  paymentStore.stopPolling();
  // Optional: Reset state so old QRs don't flash next time
  // paymentStore.resetPaymentState(); 
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] p-6">
    <Card class="w-full max-w-md border-none shadow-lg">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold">
          {{ paymentStatus === 'PAID' ? 'Payment Received' : 'Scan to Pay' }}
        </CardTitle>
      </CardHeader>

      <CardContent class="flex flex-col items-center space-y-6">
        <div v-if="isLoading" class="flex flex-col items-center py-10 space-y-4">
          <Loader2 class="w-12 h-12 animate-spin text-primary" />
          <p class="text-muted-foreground animate-pulse">Generating your KHQR...</p>
        </div>

        <div v-else-if="errorMessage" class="flex flex-col items-center py-6 space-y-4 text-destructive">
          <AlertCircle class="w-12 h-12" />
          <p class="font-medium text-center">{{ errorMessage }}</p>
          <Button variant="outline" @click="router.push('/checkout')">
            Return to Checkout
          </Button>
        </div>

        <div v-else-if="paymentStatus === 'PAID'" class="flex flex-col items-center py-10 space-y-4 text-green-500">
          <CheckCircle2 class="w-20 h-20 animate-bounce" />
          <p class="text-xl font-bold">Thank you!</p>
          <p class="text-muted-foreground">Redirecting you now...</p>
        </div>

        <div v-else-if="qrString" class="flex flex-col items-center w-full space-y-6">
          <div class="p-4 bg-white border rounded-xl shadow-sm">
            <qrcode-vue :value="qrString" :size="240" level="H" class="rounded-lg" />
          </div>
          
          <div class="text-center">
            <p class="text-sm uppercase tracking-wider text-muted-foreground">Total Amount</p>
            <p class="text-3xl font-black text-primary">
              ${{ currentOrder?.total?.toFixed(2) || '0.00' }}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter v-if="qrString && paymentStatus === 'PENDING' && !isLoading" class="flex flex-col pb-8">
        <div class="flex items-center space-x-2 text-sm text-muted-foreground">
          <Loader2 class="w-4 h-4 animate-spin" />
          <span>Waiting for payment confirmation...</span>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>