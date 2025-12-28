import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllProducts } from "@/api/products.api";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const loading = ref(false);
  const page = ref(1); // current page
  const totalPages = ref(1); // total pages
  const limit = 8; // items per page
  const search = ref("")

  const fetchProducts = async (newPage = 1) => {
    loading.value = true;
    page.value = newPage;

    try {
      const response = await getAllProducts({ page: page.value, limit, search: search.value });

      products.value = response.products || [];

      // Set totalPages from API, or calculate if needed
      totalPages.value =
        response.totalPages ?? Math.ceil(response.totalItems / limit) ?? 1;
    } finally {
      loading.value = false;
    }
  };

  return { products, loading, page, totalPages, search, fetchProducts };
});
