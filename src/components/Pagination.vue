<template>
  <div class="flex justify-center gap-2 mt-6">
    <button
      class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      :disabled="currentPage <= 1"
      @click="$emit('change-page', currentPage - 1)"
    >
      Prev
    </button>

    <span class="px-3 py-1">{{ currentPage }} / {{ totalPages }}</span>

    <button
      class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      :disabled="currentPage >= totalPages"
      @click="$emit('change-page', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});
</script>
