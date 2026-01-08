import { defineStore } from "pinia";
import { ref, watch } from "vue";
import {
  getCategories,
  getAllProducts,
  createProduct,
  deleteProduct
} from "@/api/products.api";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const loading = ref(false);
  const page = ref(1); // current page
  const totalPages = ref(1); // total pages
  const limit = 8; // items per page
  const search = ref("");
  const category = ref(""); // selected category
  const categories = ref([]);
  const createPrd = ref([]);
  const deleted = ref([])

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

  // delete
  const deletedProduct = async (id) =>{
    const token = localStorage.getItem('token')
    try {
      deleted.value = await deleteProduct(id, token)
    } catch (err) {
      console.log("Delete product fail", err.message);
      
    }
  }

  // create product in admin dashboard
  const createProducts = async (productData) => {
    const token = localStorage.getItem("token");

    // 1. Debugging: Check if 'image' is actually a File object before sending
    const { name, price, stock, category, image } = productData;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("image", image);

    try {
      // 2. Note: If your createProduct (API helper) is already setting headers,
      // ensure it isn't overriding the multipart boundary.
      const res = await createProduct(formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type here.
          // Axios sets it automatically with the correct boundary when it sees FormData.
        },
      });

      // 3. Refresh the list so the new product appears immediately
      await fetchProducts(1);

      return res;
    } catch (err) {
      console.error(
        "Error creating product:",
        err.response?.data || err.message
      );
      throw err;
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
    createProducts,
    deletedProduct
  };
});
