<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
    <p class="text-sm text-muted-foreground">
      Showing page <span class="font-medium text-foreground">{{ currentPage }}</span> 
      of <span class="font-medium text-foreground">{{ totalPages }}</span>
    </p>

    <nav class="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        :disabled="currentPage <= 1"
        @click="$emit('change-page', currentPage - 1)"
        class="h-9 w-9"
      >
        <ChevronLeft class="h-4 w-4" />
        <span class="sr-only">Previous page</span>
      </Button>

      <div class="flex items-center gap-1">
        <template v-for="(page, index) in displayedPages" :key="index">
          <Button
            v-if="page !== '...'"
            variant="ghost"
            size="sm"
            :class="[
              'h-9 w-9 font-medium',
              currentPage === page 
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border-blue-200 border' 
                : 'text-muted-foreground hover:text-foreground'
            ]"
            @click="$emit('change-page', page)"
          >
            {{ page }}
          </Button>
          
          <span v-else class="flex h-9 w-9 items-center justify-center text-muted-foreground">
            <MoreHorizontal class="h-4 w-4" />
          </span>
        </template>
      </div>

      <Button
        variant="outline"
        size="icon"
        :disabled="currentPage >= totalPages"
        @click="$emit('change-page', currentPage + 1)"
        class="h-9 w-9"
      >
        <ChevronRight class="h-4 w-4" />
        <span class="sr-only">Next page</span>
      </Button>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});

defineEmits(['change-page']);

// Logic to calculate [1, '...', 4, 5, 6, '...', 20]
const displayedPages = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  const delta = 1; // Number of pages to show around current
  const range = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || 
      i === total || 
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }
  return range;
});
</script>


<!-- <template>
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
</script> -->







