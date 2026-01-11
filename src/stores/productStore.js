import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getCategories,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/api/products.api";

export const useProductStore = defineStore("products", () => {
  // --- STATE ---
  const products = ref([]);
  const categories = ref([]);
  const loading = ref(false);
  const page = ref(1);
  const totalPages = ref(1);
  const limit = 8;
  const search = ref("");
  const category = ref("");

  // --- ACTIONS ---

  /**
   * Fetch products with pagination and filters
   */
  const fetchProducts = async (newPage = page.value) => {
    loading.value = true;
    page.value = newPage;

    try {
      const response = await getAllProducts({
        page: page.value,
        limit,
        search: search.value,
        category: category.value,
      });

      products.value = response.products || [];
      // Calculate total pages based on gateway response
      totalPages.value = response.totalPages || Math.ceil(response.totalItems / limit) || 1;
    } catch (err) {
      console.error("Fetch products failed:", err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch all categories
   */
  const fetchCategories = async () => {
    try {
      // Token is handled by api.js interceptor automatically
      categories.value = await getCategories();
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  /**
   * Create a new product (Admin)
   */
  const createProducts = async (productData) => {
    const formData = new FormData();
    // Dynamically append fields
    Object.keys(productData).forEach((key) => {
      if (productData[key] !== null && productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    try {
      const res = await createProduct(formData);
      // Refresh to page 1 to show the newest product
      await fetchProducts(1);
      return res;
    } catch (err) {
      console.error("Create product fail:", err.response?.data || err.message);
      throw err;
    }
  };

  /**
   * Update existing product
   */
  const updateProductStore = async (id, productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (productData[key] !== null && productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    try {
      const res = await updateProduct(id, formData);
      await fetchProducts(); // Refresh current page
      return res;
    } catch (err) {
      console.error("Update product fail:", err);
      throw err;
    }
  };

  /**
   * Delete product
   */
  const deletedProduct = async (id) => {
    try {
      await deleteProduct(id);
      // Refresh current page after deletion
      await fetchProducts();
    } catch (err) {
      console.error("Delete product fail:", err.message);
      throw err;
    }
  };

  return {
    // State
    products,
    loading,
    page,
    totalPages,
    search,
    category,
    categories,
    // Actions
    fetchProducts,
    fetchCategories,
    createProducts,
    deletedProduct,
    updateProductStore
  };
});