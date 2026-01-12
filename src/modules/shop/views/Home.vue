<template>
  <div class="min-h-screen flex flex-col mt-[100px]">
    <!-- Header -->
    <Header/>
    <section class="  py-12">
      <div class="max-w-7xl mx-auto bg-[#fdfafa] shadow shadow-black-100 rounded-[32px] overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div class="px-8 py-16 lg:px-16 bg-[#FFFFFF]">
            <span class="text-sm font-semibold tracking-widest text-red-500">SUMMER 2024 COLLECTION</span>
            <h1 class="mt-6 text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-neutral-900">Redefine<br /><span class="text-red-500">Your Style</span></h1>
            <p class="mt-6 max-w-md text-neutral-600 text-base leading-relaxed">Discover our new seasonal drop featuring refined essentials for the modern wardrobe. Clean lines, premium materials.</p>
          <div class="mt-10 flex flex-wrap gap-4">
              <a href="#" class="inline-flex items-center justify-center rounded-full bg-red-500 px-8 py-4 text-white font-semibold shadow-md hover:bg-red-600 transition">Shop Now</a>
              <a href="#" class="inline-flex items-center justify-center rounded-full bg-[#f2e9e6] px-8 py-4 text-neutral-900 font-semibold hover:bg-[#eadfdb] transition">Lookbook</a>
        </div>
        </div>
      <div class="relative h-[360px] sm:h-[460px] lg:h-full">
      <img src="/banner.jpg" alt="Fashion Model" class="absolute inset-0 h-full w-full object-cover" />
      </div>
      </div>
      </div>
    </section>
   <section class="mt-8">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Left Featured Card -->
      <div class="bg-[#F7F5FF] rounded-2xl flex h-[520px] overflow-hidden">
        <!-- Text -->
        <div class="w-1/2 p-10 flex flex-col justify-center">
          <span class="bg-[#D7D5DE] w-[200px] h-[35px] rounded-full flex items-center justify-center font-bold">
            Trending Now
          </span>

          <h2 class="text-4xl font-bold text-[#3E0A25] mt-4 mb-4">
            New Summer Collection
          </h2>

          <p class="text-[#878689] mb-4">
            Discover our latest arrivals designed for the modern lifestyle.
            Elegant, comfortable, and sustainable fashion for every occasion.
          </p>

          <a
            href="#"
            class="w-[250px] h-[45px] bg-[#242223] text-white rounded-full
                   flex items-center justify-center gap-3 text-lg
                   hover:bg-[#3E0A25] transition"
          >
            Explore Collection
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <!-- Image -->
        <div class="w-1/2 overflow-hidden">
          <img
            src="/image.png"
            class="w-full h-full object-cover hover:scale-110 transition duration-1000"
            alt=""
          />
        </div>
      </div>

      <!-- Right Grid -->
      <div class="grid grid-cols-2 gap-5">

        <!-- Card -->
        <div class="bg-[#E6F4FF] rounded-2xl h-[250px] flex overflow-hidden group">
          <div class="w-1/2 p-4 flex flex-col justify-center">
            <h2 class="text-2xl font-bold">Men's Wear</h2>
            <p class="text-gray-600 mb-3">242 products</p>
            <a href="#" class="font-bold flex items-center gap-2">
              Shop Now
              <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition"></i>
            </a>
          </div>
          <div class="w-1/2 overflow-hidden">
            <img src="/image7.png"
              class="w-full h-full object-cover group-hover:scale-110 transition"
            />
          </div>
        </div>

        <div class="bg-[#FFF4E6] rounded-2xl h-[250px] flex overflow-hidden group">
          <div class="w-1/2 p-4 flex flex-col justify-center">
            <h2 class="text-2xl font-bold">Kid's Fashion</h2>
            <p class="text-gray-600 mb-3">185 products</p>
            <a href="#" class="font-bold flex items-center gap-2">
              Shop Now
              <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition"></i>
            </a>
          </div>
          <div class="w-1/2 overflow-hidden">
            <img src="/image5.png"
              class="w-full h-full object-cover group-hover:scale-110 transition"
            />
          </div>
        </div>

        <div class="bg-[#FFE6EB] rounded-2xl h-[250px] flex overflow-hidden group">
          <div class="w-1/2 p-4 flex flex-col justify-center">
            <h2 class="text-2xl font-bold">Beauty Products</h2>
            <p class="text-gray-600 mb-3">127 products</p>
            <a href="#" class="font-bold flex items-center gap-2">
              Shop Now
              <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition"></i>
            </a>
          </div>
          <div class="w-1/2 overflow-hidden">
            <img src="/image3.png"
              class="w-full h-full object-cover group-hover:scale-110 transition"
            />
          </div>
        </div>

        <div class="bg-[#E6FFE8] rounded-2xl h-[250px] flex overflow-hidden group">
          <div class="w-1/2 p-4 flex flex-col justify-center">
            <h2 class="text-2xl font-bold">Accessories</h2>
            <p class="text-gray-600 mb-3">308 products</p>
            <a href="#" class="font-bold flex items-center gap-2">
              Shop Now
              <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition"></i>
            </a>
          </div>
          <div class="w-1/2 overflow-hidden">
            <img src="/image4.png"
              class="w-full h-full object-cover group-hover:scale-110 transition"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

    <section class="mt-5 px-20 py-12">
      <div class=" flex mx-auto justify-between items-center">
        <h3 class=" text-3xl font-semibold">Featured Collections</h3>
        <a href="#" class="inline-flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 transition">
          <span>View All</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
        </a>

      </div>
    </section>
    <section class="max-w-7xl mx-auto mb-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="bg-white h-[550px] rounded-[60px] shadow hover:shadow-lg transition overflow-hidden relative group">
          <img
            src="https://i.pinimg.com/1200x/6b/d4/d4/6bd4d445b8311b60ca63f81eb2c1cfee.jpg"
            alt="Product"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-black opacity-30 transition-opacity duration-500 group-hover:opacity-0"></div>
        </div>
        <!-- Card 2 -->
        <div class="bg-white h-[550px] rounded-[60px] shadow hover:shadow-lg transition overflow-hidden relative group">
          <img
            src="https://i.pinimg.com/736x/12/ac/48/12ac48e8963393fdb198358fbc4d8cbd.jpg"
            alt="Product"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-black opacity-30 transition-opacity duration-500 group-hover:opacity-0"></div>
        </div>
        <!-- Card 3 -->
         <div class="bg-white h-[550px] rounded-[60px] shadow hover:shadow-lg transition overflow-hidden relative group">
          <img
            src="https://i.pinimg.com/1200x/ae/8f/75/ae8f75db41c37d1c1303b14417486fab.jpg"
            alt="Product"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-black opacity-30 transition-opacity duration-500 group-hover:opacity-0"></div>
        </div>
      </div>
    </section>
  
    <section
      class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20 md:py-40 text-center px-4">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">Welcome to E-Shop</h1>
      <p class="text-lg mb-8 opacity-90">Find the best products at the best prices!</p>

      <div
        class="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto gap-0 overflow-hidden rounded-lg shadow-2xl">

        <div class="relative  md:flex-1 items-center ">
          <BaseInput v-model="searchQuery" placeholder="Search products..." class=" !rounded-xl border-gray-300 "
            @keyup.enter="searchProducts" />

          <!-- SEARCH button -->
          <button v-if="!isSearched" @click="searchProducts" :disabled="!searchQuery.trim()" class="absolute h-[45px] top-button-search cursor-pointer
                  bg-blue-600 text-white text-sm font-medium
                  px-4 py-2 rounded-xl
                  hover:bg-blue-700 transition
                    disabled:cursor-not-allowed">
            Search
          </button>

          <!-- CLEAR button -->
          <button v-else @click="clearSearch" class="absolute right-1 top-2.5 cursor-pointer
                  w-9 h-9 flex items-center justify-center
                  rounded-full
                  bg-gray-100 text-gray-500
                  hover:bg-red-100 hover:text-red-500
                  transition" aria-label="Clear search">
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
        <div class="py-20 text-center">
            <h2 class="text-4xl font-bold text-gray-900">
              Featured Products
            </h2>

            <!-- underline -->
            <div class="flex justify-center mt-4">
              <span class="block w-20 h-1 bg-red-500 rounded-full"></span>
            </div>
          </div>


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

.top-button-search {
  top: 6.5px;
  right: 2px
}
</style>