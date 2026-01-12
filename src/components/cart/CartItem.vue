<template>
  <div class="group flex gap-5 items-start">
    <!-- Image -->
    <div class="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
      <img :src="item.image" alt="product" class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
    </div>

    <!-- Info -->
    <div class="flex flex-1 flex-col justify-between h-24">

      <div class="flex justify-between items-start">
        
        <h3 class="font-semibold text-gray-900 line-clamp-2 leading-snug">{{ item.name }}</h3>
        <p class="font-bold text-indigo-600 ml-4">${{ item.price.toFixed(2) }}</p>
      </div>

      <!-- Qty & Remove -->
      <div class="flex items-center justify-between">
        <div class="flex items-center bg-gray-50 rounded-lg px-1 h-9 border border-transparent hover:border-gray-200 transition-colors">
          <BaseButton variant="base" @click="$emit('decrease', item)" class="w-7 h-7 ...">-</BaseButton>
          <span class="w-8 text-center">{{ item.quantity }}</span>
          <BaseButton variant="base" @click="$emit('increase', item)" class="w-7 h-7 ...">+</BaseButton>
        </div>

        <BaseButton variant="base" @click="$emit('remove', item)" class="text-red-500 hover:text-red-600">Remove</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../ui/BaseButton.vue';

defineProps({ item: Object });
defineEmits(['increase', 'decrease', 'remove']);
</script>
