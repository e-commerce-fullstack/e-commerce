<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-end justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Order History</h1>
        <p class="text-gray-500 mt-2">Manage and track your recent purchases.</p>
      </div>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      <p class="text-gray-500 mt-4 font-medium">Loading your orders...</p>
    </div>

    <div v-else-if="orders.length === 0"
      class="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
      <div class="mx-auto h-12 w-12 text-gray-400 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-12 h-12 mx-auto">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-13.5l9 5.25" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900">No orders yet</h3>
      <p class="text-gray-500 mt-1">When you place an order, it will appear here.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in orders" :key="order._id"
        class="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">

        <div
          class="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-col sm:flex-row sm:gap-6 text-sm">
            <div>
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</span>
              <span class="font-mono text-gray-900 font-medium">#{{ order._id.slice(-8).toUpperCase() }}</span>
            </div>
            <div class="mt-2 sm:mt-0">
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wider">Date Placed</span>
              <span class="text-gray-900">{{ formatDate(order.createdAt) }}</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span :class="getStatusBadgeStyles(order.status)"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border">
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="px-6 py-6">
          <ul class="divide-y divide-gray-100">
            <li v-for="item in order.products" :key="item._id"
              class="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ item.product?.name || "Product unavailable" }}</p>
                  <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
              </div>
              <p class="font-medium text-gray-900">${{ ((item.product?.price || 0) * item.quantity).toFixed(2) }}</p>
            </li>
          </ul>
        </div>

        <div
          class="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 gap-4">
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            <span v-if="order.payment">
              {{ order.payment.method }} &bull; <span class="capitalize">{{ order.payment.status }}</span>
            </span>
            <span v-else>Payment info unavailable</span>
          </div>

          <div class="flex items-center gap-6">
            <router-link v-if="order.status === 'pending'" :to="`/payment/${order._id}`"
              class="inline-flex items-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-indigo-100 active:scale-95">
              Pay Now
            </router-link>

            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-500">Total Amount</span>
              <span class="text-xl font-bold text-gray-900">${{ order.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();
const loading = ref(true);

// Use computed to keep orders reactive to store changes
const orders = computed(() => orderStore.orders || []);

onMounted(async () => {
  try {
    loading.value = true;
    await orderStore.fetchOrders();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  } finally {
    loading.value = false;
  }
});

// Helper: Format Date
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper: Get Badge Styles
// This now returns background + border + text colors to match the template design
const getStatusBadgeStyles = (status) => {
  const s = status ? status.toLowerCase() : "";

  switch (s) {
    case "completed":
    case "delivered":
    case "paid":
      return "bg-green-50 text-green-700 border-green-200";

    case "pending":
    case "processing":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "shipped":
    case "dispatched":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";

    case "cancelled":
    case "failed":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};
</script>