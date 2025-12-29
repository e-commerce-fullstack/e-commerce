<template>
  <teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30">
      <div class="bg-white w-full max-w-lg p-4 rounded shadow relative">
        <button class="absolute top-2 right-2 text-gray-600" @click="$emit('close')">✕</button>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  show: Boolean
});
</script>
