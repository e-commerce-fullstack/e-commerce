<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <!-- Hero / Search -->
    <section class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-40 text-center">
      <h1 class="text-5xl font-bold mb-4">Welcome to E-Shop</h1>
      <p class="text-lg mb-6">Find the best products at the best prices!</p>
      <BaseInput class="mx-auto w-100" v-model="productsStore.search"
        @update:modelValue="() => productsStore.fetchProducts(1)" placeholder="Search products..." />
    </section>

    <!-- Products -->
    <section class="flex-1 py-10 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6">Featured Products</h2>

        <div v-if="productsStore.loading" class="text-center text-gray-500">
          Loading products...
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in productsStore.products" :key="product._id" :product="product" />
        </div>

        <!-- Pagination -->
        <Pagination :current-page="productsStore.page" :total-pages="productsStore.totalPages"
          @change-page="(newPage) => productsStore.fetchProducts(newPage)" />
      </div>
    </section>

    <!-- Footer -->
    <Footer />

    <!-- Cart Sidebar -->
    <CartSidebar v-model:show="showCart" />

    <!-- Floating Cart Button -->
    <transition name="fade">
      <div v-if="!showCart" class="fixed bottom-8 right-8 z-40">
        <button @click="showCart = true"
          class="relative bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700">
          <FontAwesomeIcon :icon="['fas', 'shopping-cart']" class="text-xl" />
          <span v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {{ cartCount }}
          </span>
        </button>
      </div>
    </transition>

  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Pagination from "@/components/Pagination.vue";
import ProductCard from "@/components/ProductCard.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { useProductStore } from "@/stores/productStore";
import CartSidebar from "./CartSidebar.vue";
import { useCartStore } from "@/stores/cartStore";
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import { debounce } from "lodash";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const productsStore = useProductStore();
const cartStore = useCartStore();

// Cart sidebar state
const showCart = ref(false);

// Cart count for badge
const cartCount = computed(() =>
  cartStore.cartItems.reduce((total, item) => total + item.quantity, 0)
);

// Lock background scroll when sidebar is open
watchEffect(() => {
  document.body.style.overflow = showCart.value ? 'hidden' : '';
});

// Fetch products on mount
onMounted(() => {
  productsStore.fetchProducts();
});

// Watch search with debounce
watch(
  () => productsStore.search,
  debounce(() => {
    productsStore.fetchProducts(1);
  }, 300)
);
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>