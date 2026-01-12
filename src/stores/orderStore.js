import { defineStore } from "pinia";
import { ref } from "vue";
import { createOrder, getOrders, getOrderById } from "@/api/order.api.js";

export const useOrderStore = defineStore("order", () => {
  const orders = ref([]);
  const currentOrder = ref(null);
  const loading = ref(false);

  /**
   * Create a new order via Gateway
   */
  const placeOrder = async (orderData) => {
    loading.value = true;
    try {
      const res = await createOrder(orderData);

      // FIX: Extract 'order' from the response if it exists
      // If your backend returns { order: { ... } }, use res.order
      const orderDataActual = res.order || res;

      orders.value.push(orderDataActual);
      currentOrder.value = orderDataActual;

      return orderDataActual; // Now this contains the _id for the router
    } catch (err) {
      console.error("Place order failed:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch all user orders
   */
  const fetchOrders = async () => {
    loading.value = true;
    try {
      const res = await getOrders();
      orders.value = res;
      return res;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch one specific order (Used on the Payment/Invoice page)
   */
  const fetchOrderById = async (orderId) => {
    loading.value = true;
    try {
      const res = await getOrderById(orderId);
      currentOrder.value = res;
      return res;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Reset the current order (Call this after payment is complete)
   */
  const clearCurrentOrder = () => {
    currentOrder.value = null;
  };

  return {
    orders,
    currentOrder,
    loading,
    placeOrder,
    fetchOrders,
    fetchOrderById,
    clearCurrentOrder,
  };
});
