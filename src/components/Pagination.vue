<template>
  <div class="flex justify-center gap-2 mt-6">
    <BaseButton
      variant="next_prev"
      :disabled="currentPage <= 1"
      @click="$emit('change-page', currentPage - 1)"
    >
      Prev
    </BaseButton>

    <span class="p-3 text-center text-gray-700 font-medium bg-gray-100 rounded-lg shadow-sm">{{ currentPage }} / {{ totalPages }}</span>

    <BaseButton
      variant="next_prev"
      :disabled="currentPage >= totalPages"
      @click="$emit('change-page', currentPage + 1)"
    >
      Next
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from './ui/BaseButton.vue';
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});
</script>
