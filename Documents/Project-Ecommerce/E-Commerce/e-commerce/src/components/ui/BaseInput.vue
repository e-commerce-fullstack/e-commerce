<template>
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
        </label>
        <input v-model="model" :type="type" :placeholder="placeholder"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            :required="required" />
    </div>
</template>

<script setup>
// 1. This creates a link between this input and the parent's v-model
const model = defineModel();

defineProps({
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    type: { type: String, default: "text" },
    required: { type: Boolean, default: false }
})
</script>