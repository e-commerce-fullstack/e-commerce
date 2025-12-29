<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col">
    <img :src="product.image" alt="" class="w-full h-48 object-cover rounded mb-2" />
    <h3 class="text-lg font-bold mb-2">{{ product.name }}</h3>
    <p class="text-gray-600 mb-2">Category: {{ product.category }}</p>
    <p class="text-gray-800 font-semibold mb-2">Price: ${{ product.price }}</p>
    <p class="text-gray-500 mb-1.5">Stock: {{ product.stock }}</p>
    <BaseButton variant="primary" @click="addToCart">
      Add to Cart
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from './ui/BaseButton.vue';
import { useCartStore} from '../stores/cartStore'

const cartStore = useCartStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});


const addToCart = () => {
  cartStore.addToCart(props.product)
}
</script>
