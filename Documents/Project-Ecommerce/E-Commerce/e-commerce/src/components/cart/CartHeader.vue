<template>
  <div class="flex justify-between items-center p-4 border-b">
    <h2 class="text-xl sm:text-2xl font-bold">Your Cart</h2>
    <BaseButton
      variant="base"
      class="p-2 -mr-2 text-gray-500 hover:text-black"
      @click="$emit('close')">
      ✕
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '../ui/BaseButton.vue';

defineEmits(['close']);
</script>

<style scoped>
/* optional hover styles handled via Tailwind already */
</style>
