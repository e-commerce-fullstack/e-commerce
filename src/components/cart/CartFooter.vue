<template>
  <div class="border-t p-4 bg-gray-50">
    <div class="flex justify-between items-center mb-4">
      <span class="text-gray-600">Subtotal:</span>
      <span class="text-xl font-bold">${{ total.toFixed(2) }}</span>
    </div>

    <BaseButton @click="$emit('checkout')" class="w-full bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700">
      Proceed to Checkout
    </BaseButton>

    <p class="text-center text-xs text-gray-400 mt-3">Shipping and taxes calculated at checkout</p>
  </div>
</template>

<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";
defineProps({ total: Number });
defineEmits(['checkout']);
</script>
