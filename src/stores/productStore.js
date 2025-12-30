import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { getCategories, getAllProducts } from "@/api/products.api";


export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const loading = ref(false);
  const page = ref(1); // current page
  const totalPages = ref(1); // total pages
  const limit = 8; // items per page
  const search = ref("");
  const category = ref(""); // selected category
  const categories = ref([]);

  const fetchProducts = async (newPage = page.value) => {
    if (newPage !== page.value) {
      loading.value = true;
    }

    page.value = newPage;

    try {
      const response = await getAllProducts({
        page: page.value,
        limit,
        search: search.value,
        category: category.value,
      });

      products.value = response.products || [];
      totalPages.value =
        response.totalPages ?? Math.ceil(response.totalItems / limit) ?? 1;
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      categories.value = await getCategories(token);
    } catch (err) {
      console.log("Failed to fetch categories", err);
    }
  };

  return {
    products,
    loading,
    page,
    totalPages,
    search,
    category,
    categories,
    fetchProducts,
    fetchCategories,
  };
});
