<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold tracking-tight">Product Management</h1>
      <Button class="bg-blue-600 hover:bg-blue-700">
        <Plus class="w-4 h-4 mr-2" /> Add Product
      </Button>
    </div>

    <div class="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          v-model="productStore.search" 
          @input="productStore.fetchProducts(1)"
          placeholder="Search products..." 
          class="w-full pl-10 pr-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select 
        v-model="productStore.category" 
        @change="productStore.fetchProducts(1)"
        class="border rounded-md px-4 py-2 bg-white outline-none"
      >
        <option value="">All Categories</option>
        <option v-for="cat in productStore.categories" :key="cat" :value="cat">
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
            <th class="p-4 font-medium">Price</th>
            <th class="p-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-if="productStore.loading">
            <td colspan="5" class="p-8 text-center text-slate-500">Loading products...</td>
          </tr>
          <tr v-for="product in productStore.products" :key="product._id" class="hover:bg-slate-50 transition-colors">
            <td class="p-4">
              <img :src="product.image" class="w-12 h-12 rounded object-cover border" />
            </td>
            <td class="p-4 font-medium">{{ product.name }}</td>
            <td class="p-4 text-slate-600">{{ product.category }}</td>
            <td class="p-4 font-semibold text-blue-600">${{ product.price }}</td>
            <td class="p-4">
              <div class="flex gap-2">
                <Button variant="ghost" size="icon" class="text-slate-500"><Edit class="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" class="text-red-500"><Trash2 class="w-4 h-4" /></Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { Button } from '@/components/ui/button';
import { Plus, Search, Edit, Trash2 } from 'lucide-vue-next';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
  productStore.fetchCategories();
});
</script>