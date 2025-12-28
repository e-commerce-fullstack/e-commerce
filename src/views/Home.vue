<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <section class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20 text-center">
      <h1 class="text-5xl font-bold mb-4">Welcome to ShopEasy</h1>
      <p class="text-lg mb-6">Find the best products at the best prices!</p>
      <BaseInput class="mx-auto w-100" v-model="productsStore.search"
        @update:modelValue="() => productsStore.fetchProducts(1)" placeholder="Search products..." />


    </section>

    <!-- Fetch product -->
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
  </div>
</template>

<script setup>


import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { ref } from 'vue'
import Pagination from "@/components/Pagination.vue";
import { debounce } from "lodash";


import { onMounted, watch } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/ProductCard.vue";
import BaseInput from "@/components/ui/BaseInput.vue";

const productsStore = useProductStore();

onMounted(() => {
  productsStore.fetchProducts(); // fetch products when the page mounts
});



// watch search and call fetchProducts after 300ms
watch(
  () => productsStore.search,
  debounce(() => {
    productsStore.fetchProducts(1);
  }, 300)
);

</script>
