<template>
  <div :class="[
    'fixed top-0 right-0 h-full z-50 flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out',
    'w-full sm:w-[400px]',
    show ? 'translate-x-0' : 'translate-x-full'
  ]">
    <!-- Header -->
    <CartHeader @close="closeCart" />

    <!-- Empty Cart -->
    <CartEmpty v-if="cartStore.cartItems.length === 0" @close="closeCart" />

    <!-- Cart Items -->
    <div v-else class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
      <CartItem v-for="item in cartStore.cartItems" :key="item._id" :item="item" @increase="increaseQty"
        @decrease="decreaseQty" @remove="removeItem" />
    </div>

    <!-- Footer -->
    <CartFooter :total="totalPrice" @checkout="proceedToCheckout" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

// Subcomponents
import CartHeader from "./CartHeader.vue";
import CartEmpty from "./CartEmpty.vue";
import CartItem from "./CartItem.vue";
import CartFooter from "./CartFooter.vue";

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["update:show"]);

const cartStore = useCartStore();
const router = useRouter();

// Close sidebar
const closeCart = () => emit("update:show", false);

// Cart item actions
const removeItem = (item) => cartStore.removeFromCart(item._id);
const increaseQty = (item) => cartStore.updateQuantity(item._id, item.quantity + 1);
const decreaseQty = (item) => {
  if (item.quantity > 1) cartStore.updateQuantity(item._id, item.quantity - 1);
};

// Proceed to checkout
const proceedToCheckout = () => {
  closeCart();
  router.push("/checkout");
};

// Computed total
const totalPrice = computed(() => cartStore.totalPrice);
</script>

<style scoped>
/* Smooth slide-in/out from right */
.fixed.transition-transform {
  transform: translateX(100%);
}

.fixed.translate-x-0 {
  transform: translateX(0);
}

.fixed.translate-x-full {
  transform: translateX(100%);
}
</style>
