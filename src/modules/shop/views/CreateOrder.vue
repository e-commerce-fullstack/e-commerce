<script setup>
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const orderStore = useOrderStore();
const router = useRouter();

const placeOrder = async () => {
    await orderStore.placeOrder(
        cartStore.cartItems.map(item => ({
            product: item._id,
            quantity: item.quantity
        }))
    );

    cartStore.clearCart();
    router.push("/orders");
};
</script>

<template>
    <button @click="placeOrder">Confirm Order</button>
</template>
