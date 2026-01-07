<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <!-- Hero / Search -->
    <section
      class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20 md:py-40 text-center px-4">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">Welcome to E-Shop</h1>
      <p class="text-lg mb-8 opacity-90">Find the best products at the best prices!</p>

      <div
        class="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto gap-0 overflow-hidden rounded-lg shadow-2xl">

        <div class="relative  md:flex-1 items-center ">
          <BaseInput
            v-model="searchQuery"
            placeholder="Search products..."
            class=" !rounded-xl border-gray-300 "
            @keyup.enter="searchProducts"
          />

          <!-- SEARCH button -->
          <button
            v-if="!isSearched"
            @click="searchProducts"
            :disabled="!searchQuery.trim()"
            class="absolute h-[45px] top-button-search cursor-pointer
                  bg-blue-600 text-white text-sm font-medium
                  px-4 py-2 rounded-xl
                  hover:bg-blue-700 transition
                    disabled:cursor-not-allowed"
          >
            Search
          </button>

          <!-- CLEAR button -->
          <button
            v-else
            @click="clearSearch"
            class="absolute right-1 top-2.5 cursor-pointer
                  w-9 h-9 flex items-center justify-center
                  rounded-full
                  bg-gray-100 text-gray-500
                  hover:bg-red-100 hover:text-red-500
                  transition"
            aria-label="Clear search"
          >
            ✕
          </button>
        </div>


        <!-- category filter -->
        <div class="ml-1 mt-3 md:mt-0 relative w-full md:w-auto">
          <div class="relative group">
            <select v-model="productsStore.category" @change="productsStore.fetchProducts(1)" class="w-full md:w-56 bg-gray-50 text-gray-700 py-3 pl-4 pr-10 
             border border-gray-200 rounded-xl transition-all duration-200
             appearance-none cursor-pointer
             hover:bg-white hover:border-blue-400 
             focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500">
              <option value="">All Categories</option>
              <option v-for="cat in productsStore.categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>

            <div
              class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 group-hover:text-blue-500 transition-colors">
              <svg class="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
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
import CartSidebar from "@/components/cart/CartSidebar.vue";
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

const searchQuery = ref("");
const isSearched = ref(false);

function searchProducts() {
  if (!searchQuery.value.trim()) return;

  productsStore.search = searchQuery.value;
  productsStore.fetchProducts(1);
  isSearched.value = true;
}

function clearSearch() {
  searchQuery.value = "";
  productsStore.search = "";
  productsStore.fetchProducts(1);
  isSearched.value = false;
}

watch(searchQuery, (val) => {
  if (!val) isSearched.value = false;
});


// Fetch products on mount
onMounted(() => {
  productsStore.fetchProducts();
  productsStore.fetchCategories()

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

.top-button-search{
  top: 6.5px;
  right: 2px
}
</style>