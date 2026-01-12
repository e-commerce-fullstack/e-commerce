<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold tracking-tight">Product Management</h1>
      <!-- <Button class="bg-blue-600 hover:bg-blue-700"> -->
      <EditAddProductModal />
      <!-- </Button> -->
    </div>

    <div class="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input v-model="productsStore.search" @input="productsStore.fetchProducts(1)" placeholder="Search products..."
          class="w-full pl-10 pr-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <select v-model="productsStore.category" @change="productsStore.fetchProducts(1)"
        class="border rounded-md px-4 py-2 bg-white outline-none">
        <option value="">All Categories</option>
        <option v-for="cat in productsStore.categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-slate-50 border-b text-slate-600 text-sm">
          <tr>
            <th class="p-4 font-medium">Image</th>
            <th class="p-4 font-medium">Name</th>
            <th class="p-4 font-medium">Category</th>
            <th class="p-4 font-medium">Stock</th>
            <th class="p-4 font-medium">Price</th>
            <th class="p-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-if="productsStore.loading">
            <td colspan="5" class="p-8 text-center text-slate-500">Loading products...</td>
          </tr>
          <tr v-for="product in productsStore.products" :key="product._id" :product="product"
            class="hover:bg-slate-50 transition-colors">
            <td class="p-4">
              <img :src="product.image" class="w-12 h-12 rounded object-cover border" />
            </td>
            <td class="p-4 font-medium">{{ product.name }}</td>
            <td class="p-4 text-slate-600">{{ product.category }}</td>
            <td class="p-4 text-slate-600">{{ product.stock }}</td>
            <td class="p-4 font-semibold text-blue-600">${{ product.price }}</td>
            <td class="p-4">
              <div class="flex gap-2">
                <EditAddProductModal :product="product" />
                <!-- Confirm delete modal -->
                <DeleteProductDialog :product-id="product._id" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="p-4 border-t bg-slate-50/50">
        <Pagination :current-page="productsStore.page" :total-pages="productsStore.totalPages"
          @change-page="(newPage) => productsStore.fetchProducts(newPage)" />
      </div>
    </div>
  </div>


</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { Button } from '@/components/ui/button';
import { Plus, Search, Edit, Trash2 } from 'lucide-vue-next';
import Pagination from '@/components/Pagination.vue';
import EditAddProductModal from '../components/ui/EditAddProductModal.vue';
import DeleteProductDialog from '../components/ui/DeleteProductDialog.vue';

const productsStore = useProductStore();

onMounted(() => {
  productsStore.fetchProducts();
  productsStore.fetchCategories();
  // productsStore.deletedProduct()
});


</script>