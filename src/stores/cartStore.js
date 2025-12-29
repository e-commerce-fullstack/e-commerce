import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  // ✅ Load cart from localStorage if exists, else empty array
  const cartItems = ref(JSON.parse(localStorage.getItem("cart")) || []);

  const addToCart = (product) => {
    const existing = cartItems.value.find((item) => item._id === product._id);
    const fullImage = `${import.meta.env.VITE_API_BASE_URL}/${product.image}`;

    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1,
        image: fullImage,
      });
    }
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter((item) => item._id !== productId);
  };

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find((i) => i._id === productId);
    if (item) item.quantity = quantity;
  };

  const totalPrice = computed(() =>
    cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  // ✅ Persist cart to localStorage whenever it changes
  watch(
    cartItems,
    (newCart) => {
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    { deep: true }
  );

  return { cartItems, addToCart, removeFromCart, updateQuantity, totalPrice };
});
