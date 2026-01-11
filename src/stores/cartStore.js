import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  // ✅ Initialize state
  const cartItems = ref(JSON.parse(localStorage.getItem("cart")) || []);

  // --- ACTIONS ---

  const addToCart = (product) => {
    const existing = cartItems.value.find((item) => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1,
      });
    }
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter((item) => item._id !== productId);
  };

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find((i) => i._id === productId);
    if (item && quantity > 0) {
      item.quantity = parseInt(quantity);
    } else if (item && quantity <= 0) {
      removeFromCart(productId); // Auto-remove if quantity hits 0
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  // --- GETTERS ---

  const totalPrice = computed(() =>
    cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  // ✅ New: Count total items (e.g., 2 shirts + 1 hat = 3 items)
  const totalItemsCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  );

  // --- WATCHERS ---

  watch(
    cartItems,
    (newCart) => {
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    { deep: true }
  );

  return { 
    cartItems, 
    totalItemsCount,
    totalPrice, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  };
});