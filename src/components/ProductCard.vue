<template>
  <!-- <div class="bg-white rounded-lg shadow p-4 flex flex-col">
    <img :src="product.image" alt="" class="w-full h-48 object-cover rounded mb-2" />
    <h3 class="text-lg font-bold mb-2">{{ product.name }}</h3>
    <p class="text-gray-600 mb-2">Category: {{ product.category }}</p>
    <p class="text-gray-800 font-semibold mb-2">Price: ${{ product.price }}</p>
    <p class="text-gray-500 mb-1.5">Stock: {{ product.stock }}</p>
    <BaseButton variant="primary" @click="addToCart">
      Add to Cart
    </BaseButton>
  </div> -->
        <div class="max-w-7xl mx-auto  gap-2">
          <!-- Card 1 -->
          <div class="rounded-2xl leading-[1.7] h-[400px] transition group cursor-pointer">
            <!-- Image Wrapper -->
            <div class="w-full relative overflow-hidden rounded-[60px]">
              <img :src="product.image" class="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105"alt=""/>

              <!-- Add to Cart Button -->
              <div class="absolute inset-0 top-55 flex items-center justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <BaseButton @click="addToCart" class="group flex items-center justify-center gap-3  
                  bg-white w-[100px] h-[50px] px-6
                  font-semibold rounded-3xl
                  text-gray-800
                  hover:bg-red-50 
                  hover:-translate-y-0.5
                  transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                  </svg>

                  Add to Cart
                </BaseButton>
                </div>
              </div>

              <!-- Content -->
              <div class="mt-3">
                <div class="flex justify-between items-center">
                  <h3
                    class="text-xl font-medium transition-colors duration-300
                          group-hover:text-red-500"
                  >
                    {{ product.name }}
                  </h3>
                  <h3 class="font-semibold text-xl text-red-500">${{ product.price }}</h3>
                </div>

                <div class="flex justify-between items-center mt-1">
                  <span class="text-gray-500 font-light">{{ product.category }}</span>
                  <span class="text-sm">Stock : {{ product.stock }}</span>
                </div>
              </div>
            </div>
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
