<template>
  <!-- Backdrop -->
  <div v-if="show" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black bg-opacity-10" @click="closeCart"></div>
  </div>

  <!-- Slide-over sidebar -->
  <div :class="[
    'fixed top-0 right-0 h-full w-96 bg-white shadow-xl flex flex-col transition-transform duration-300 z-50',
    show ? 'translate-x-0' : 'translate-x-full'
  ]">
    <!-- Header -->
    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="text-2xl font-bold">Your Cart</h2>
      <button class="text-gray-600 text-xl" @click="closeCart">✕</button>
    </div>

    <!-- Cart items -->
    <div v-if="cartStore.cartItems.length === 0" class="flex-1 flex items-center justify-center text-gray-500 p-4">
      Your cart is empty
    </div>

    <div v-else class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-for="item in cartStore.cartItems" :key="item._id" class="flex space-x-4 items-start">
        <!-- Product Image -->
        <img :src="item.image || '/placeholder.png'" alt="product" class="w-16 h-16 object-cover rounded">

        <!-- Product details -->
        <div class="flex-1">
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-gray-500 text-sm">${{ item.price.toFixed(2) }}</p>
          <div class="flex items-center space-x-2 mt-1">
            <span class="text-gray-500">Qty:</span>
            <input type="number" min="1" v-model.number="item.quantity" @change="updateQuantity(item)"
              class="w-16 border rounded p-1" />
          </div>
          <button class="text-red-600 text-sm mt-1 hover:underline" @click="removeItem(item)">
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- Footer: total + checkout -->
    <div class="border-t p-4">
      <div class="flex justify-between font-bold mb-3">
        <span>Total:</span>
        <span>${{ totalPrice.toFixed(2) }}</span>
      </div>
      <button @click="proceedToCheckout" class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
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
