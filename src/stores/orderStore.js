import { defineStore } from "pinia";
import { ref } from "vue";
import { createOrder, getOrders, getOrdersById } from "@/api/order.api.js";

export const useOrderStore = defineStore("order", () => {
  const orders = ref([]);
  // 1. Add this to hold the single order for the payment page
  const currentOrder = ref(null); 

  const placeOrder = async ({ products, total, status }) => {
    const res = await createOrder({ products, total, status });
    orders.value.push(res);
    // Optional: set this as current when created
    currentOrder.value = res; 
    return res;
  };

  const fetchOrders = async () => {
    const res = await getOrders();
    orders.value = res;
    return res;
  };

  const fetchOrderById = async (orderId) => {
    const res = await getOrdersById(orderId);
    // 2. Save the result to the reactive ref
    currentOrder.value = res; 
    return res;
  };

  return {
    orders,
    currentOrder, // 3. Export it so the component can see it
    placeOrder,
    fetchOrders,
    fetchOrderById,
  };
});