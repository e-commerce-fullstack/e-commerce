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
    const base = "rounded-xl font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
        primary: `${base} w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90`,
        secondary: `${base} py-3 bg-gray-200 text-gray-800 hover:bg-gray-300`,
        danger: "px-4 py-0 bg-red-600 text-white hover:bg-red-700",

        next_prev: "px-4 bg-white text-gray-800 font-semibold rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-in-out",

        de_increase: "py-1 hover:bg-gray-100 text-gray-600 "
    };

    return `${base} ${variants[props.variant]}`;
});
</script>