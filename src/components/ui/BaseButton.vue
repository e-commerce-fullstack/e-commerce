<template>
    <button :type="props.type" :class="baseClass" :disabled="props.disabled" v-bind="{ required: props.required }">
        <slot />
    </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    type: { type: String, default: "button" },
    variant: { type: String, default: "primary" },
    disabled: { type: Boolean, default: false }, // Added this
    required: { type: Boolean, default: true }, 
});

const baseClass = computed(() => {
    const common =
        "w-full py-3 rounded-xl font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
        primary:
            "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return `${common} ${variants[props.variant]}`;
});
</script>