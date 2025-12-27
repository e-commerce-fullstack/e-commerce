import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllProducts } from "@/api/products.api";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      products.value = await getAllProducts(); // now an array of product objects
    } finally {
      loading.value = false;
    }
  };

  return { products, loading, fetchProducts };
});
