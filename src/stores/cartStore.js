import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);

  const addToCart = (product) => {
    const existing = cartItems.value.find(item => item._id === product._id);
    // ✅ ADDED: store full image URL in cart item
    const fullImage = `${import.meta.env.VITE_API_BASE_URL}/${product.image}`;

    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1,
        image: fullImage // ✅ UPDATED: previously only product.image
      });
    }
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item._id !== productId); // ✅ UPDATED: simplified, removed _id._id bug
  };

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find(i => i._id === productId); // ✅ UPDATED: simplified, removed _id._id bug
    if (item) item.quantity = quantity;
  };

  const totalPrice = computed(() =>
    cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  ); // ✅ UPDATED: corrected missing return in your old code

  return { cartItems, addToCart, removeFromCart, updateQuantity, totalPrice };
});
