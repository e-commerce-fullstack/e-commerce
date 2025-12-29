<template>
  <div :class="[
    'fixed top-0 right-0 h-full z-50 flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out',
    'w-full sm:w-[400px]',
    show ? 'translate-x-0' : 'translate-x-full'
  ]">

    <!-- Header -->
    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="text-xl sm:text-2xl font-bold">Your Cart</h2>
      <button class="p-2 -mr-2 text-gray-500 hover:text-black" @click="closeCart">✕</button>
    </div>

    <!-- Empty Cart -->
    <div v-if="cartStore.cartItems.length === 0"
      class="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
      <p class="text-lg">Your cart is empty</p>
      <button @click="closeCart" class="mt-4 text-indigo-600 font-medium">Continue Shopping</button>
    </div>

    <!-- Cart Items -->
    <div v-else class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
      <div v-for="item in cartStore.cartItems" :key="item._id" class="group flex gap-5 items-start">
        <div class="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <img :src="item.image" alt="product"
            class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
        </div>

        <div class="flex flex-1 flex-col justify-between h-24">

          <div>
            <div class="flex justify-between items-start">
              <h3 class="font-semibold text-gray-900 line-clamp-2 leading-snug">
                {{ item.name }}
              </h3>
              <p class="font-bold text-indigo-600 ml-4">
                ${{ item.price.toFixed(2) }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">

            <div
              class="flex items-center bg-gray-50 rounded-lg px-1 h-9 border border-transparent hover:border-gray-200 transition-colors">
              <button @click="decreaseQty(item)"
                class="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-white rounded-md transition-all disabled:opacity-50">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4"></path>
                </svg>
              </button>

              <span class="w-8 text-center text-sm font-semibold text-gray-900 select-none">
                {{ item.quantity }}
              </span>

              <button @click="increaseQty(item)"
                class="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-white rounded-md transition-all">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>

            <button @click="removeItem(item)"
              class="group/trash flex items-center text-xs font-medium text-gray-400 hover:text-red-500 transition-colors px-2 py-1">
              <span class="sr-only">Remove</span>
              <svg class="w-5 h-5 transition-transform group-hover/trash:scale-110" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                </path>
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t p-4 bg-gray-50">
      <div class="flex justify-between items-center mb-4">
        <span class="text-gray-600">Subtotal:</span>
        <span class="text-xl font-bold">${{ totalPrice.toFixed(2) }}</span> <!-- ✅ UPDATED -->
      </div>

      <BaseButton @click="proceedToCheckout"
        class="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700">
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

const props = defineProps({ show: Boolean });
const emit = defineEmits(["update:show"]);

const cartStore = useCartStore();
const router = useRouter();

// Close sidebar
const closeCart = () => emit("update:show", false);

// Remove item from cart
const removeItem = (item) => cartStore.removeFromCart(item._id); // ✅ UPDATED

// Increase quantity
const increaseQty = (item) => cartStore.updateQuantity(item._id, item.quantity + 1); // ✅ UPDATED

// Decrease quantity
const decreaseQty = (item) => {
  if (item.quantity > 1) cartStore.updateQuantity(item._id, item.quantity - 1); // ✅ UPDATED
};

// Proceed to checkout
const proceedToCheckout = () => {
  closeCart();
  router.push("/cart");
};

// Computed total price
const totalPrice = computed(() => cartStore.totalPrice); // ✅ UPDATED
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
