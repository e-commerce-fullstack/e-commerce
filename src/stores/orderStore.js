import { defineStore } from "pinia";
import { ref } from "vue";
import { createOrder, getOrders, getOrdersById } from "@/api/order.api.js";

export const useOrderStore = defineStore("order", () => {
  const orders = ref([]);

  // ✅ accept single object
  const placeOrder = async ({ products, total, status }) => {
    const res = await createOrder({ products, total, status });
    orders.value.push(res);
    return res;
  };

  const fetchOrders = async () => {
    const res = await getOrders();
    orders.value = res;
    return res;
  };

  const fetchOrderById = async (orderId) => {
    const res = await getOrdersById(orderId);
    return res;
  };

  return {
    orders,
    placeOrder,
    fetchOrders,
    fetchOrderById,
  };
});
