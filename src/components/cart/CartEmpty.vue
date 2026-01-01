<template>
  <div class="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
    <p class="text-lg">Your cart is empty</p>
    <BaseButton @click="$emit('close')" class="mt-4 text-indigo-600 font-medium">
      Continue Shopping
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '../ui/BaseButton.vue';

defineEmits(['close']);
</script>
