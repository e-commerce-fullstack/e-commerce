<template>
  <div class="max-w-md mx-auto bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 p-8 mt-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <BaseButton @click="goBack" variant="base"
        class="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
        ← Back to Store
      </BaseButton>
      <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Step 2 of 2</span>
    </div>

    <h2 class="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Checkout</h2>

    <!-- Cart items -->
    <div class="space-y-4 mb-8 px-3">
      <div v-for="item in cartItems" :key="item._id"
        class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
        <div class="flex flex-col">
          <span class="font-semibold text-slate-800">{{ item.name }}</span>
          <span class="text-sm text-slate-500">Qty: {{ item.quantity }}</span>
        </div>
        <span class="font-medium text-slate-900">
          ${{ (item.price * item.quantity).toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Total -->
    <div class="border-t border-slate-100 pt-6 space-y-3">
      <div class="flex justify-between text-slate-500 text-sm">
        <span>Subtotal</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-slate-500 text-sm">
        <span>Shipping</span>
        <span class="text-green-600 font-medium">Free</span>
      </div>
      <div class="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
        <span class="text-lg font-bold text-slate-900">Total Amount</span>
        <span class="text-2xl font-black text-indigo-600">${{ total.toFixed(2) }}</span>
      </div>
    </div>

    <BaseButton @click="confirmOrder"
      class="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] focus:ring-4 focus:ring-indigo-100">
      Complete Purchase
    </BaseButton>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import BaseButton from "@/components/ui/BaseButton.vue";

const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();

// Reactive cart items
const cartItems = cartStore.cartItems;

// Total amount
const total = computed(() =>
  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Confirm order
const confirmOrder = async () => {
  try {
    // Build payload object
    const payload = {
      products: cartItems.map(i => ({ product: i._id, quantity: i.quantity })),
      total: total.value,
      status: "pending",
    };
    console.log("Payload to send:", payload); // debug log

    // Call order store with payload
    const res = await orderStore.placeOrder(payload);
    console.log("Order created:", res); // debug log

    // Clear cart after success
    localStorage.removeItem("cart");

    // Navigate to orders page
    router.push("/order");
  } catch (err) {
    console.error("Failed to place order:", err);
  }
};

// Go back button
const goBack = () => router.back();
</script>
