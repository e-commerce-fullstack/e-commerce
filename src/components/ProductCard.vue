<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col">
    <img :src="imageUrl" alt="" class="w-full h-48 object-cover rounded mb-2" />
    <h3 class="text-lg font-bold mb-2">{{ product.name }}</h3>
    <p class="text-gray-600 mb-2">Category: {{ product.category }}</p>
    <p class="text-gray-800 font-semibold mb-2">Price: ${{ product.price }}</p>
    <p class="text-gray-500">Stock: {{ product.stock }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/${props.product.image}`;

</script>
