<template>

  <!-- Slide-over sidebar -->
  <div v-if="show" @click="closeCart" class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"></div>

  <div :class="[
    'fixed top-0 right-0 h-full z-50 flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out',
    /* RESPONSIVE WIDTH: Full screen on mobile, 400px on desktop */
    'w-full sm:w-[400px]',
    show ? 'translate-x-0' : 'translate-x-full'
  ]">

    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="text-xl sm:text-2xl font-bold">Your Cart</h2>
      <button class="p-2 -mr-2 text-gray-500 hover:text-black" @click="closeCart">
        <span class="text-2xl">✕</span>
      </button>
    </div>

    <div v-if="cartStore.cartItems.length === 0"
      class="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
      <p class="text-lg">Your cart is empty</p>
      <button @click="closeCart" class="mt-4 text-indigo-600 font-medium">Continue Shopping</button>
    </div>

    <div v-else class="flex-1 overflow-y-auto p-4 space-y-6">
      <div v-for="item in cartStore.cartItems" :key="item._id"
        class="flex space-x-4 items-start pb-4 border-b border-gray-100 last:border-0">
        <img :src="item.image || '/placeholder.png'" alt="product"
          class="w-20 h-20 object-cover rounded-md flex-shrink-0">

        <div class="flex-1 min-w-0">
          <p class="font-medium text-gray-900 truncate">{{ item.name }}</p>
          <p class="text-indigo-600 font-semibold mt-1">${{ item.price.toFixed(2) }}</p>

          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center border rounded-lg">
              <BaseButton @click="decreaseQty(item)" class="px-3 py-1 hover:bg-gray-100 text-gray-600">-</BaseButton>
              <span class="px-3 py-1 font-medium min-w-[40px] text-center">{{ item.quantity }}</span>
              <BaseButton @click="increaseQty(item)" class="px-3 py-1 hover:bg-gray-100 text-gray-600">+</BaseButton>
            </div>

            <BaseButton class="text-red-500 text-sm font-medium hover:text-red-700" @click="removeItem(item)">
              Remove
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t p-4 bg-gray-50">
      <div class="flex justify-between items-center mb-4">
        <span class="text-gray-600">Subtotal:</span>
        <span class="text-xl font-bold">${{ totalPrice.toFixed(2) }}</span>
      </div>

      <BaseButton @click="proceedToCheckout"
        class="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-transform hover:bg-indigo-700">
        Proceed to Checkout
      </BaseButton>

      <p class="text-center text-xs text-gray-400 mt-3">Shipping and taxes calculated at checkout</p>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";

const props = defineProps({
  show: Boolean
});
const emit = defineEmits(["update:show"]);

const cartStore = useCartStore();
const router = useRouter();

// Close sidebar
const closeCart = () => emit("update:show", false);

// Remove item
const removeItem = (item) => cartStore.removeFromCart(item._id);

// Update quantity
const updateQuantity = (item) => {
  if (item.quantity < 1) item.quantity = 1;
  cartStore.updateQuantity(item._id, item.quantity);
};

// Checkout
const proceedToCheckout = () => {
  closeCart();
  router.push("/cart");
};

// Total price
const totalPrice = computed(() =>
  cartStore.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);
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
