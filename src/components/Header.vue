<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between p-4">

      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img src="/logo.png" alt="ShopEasy" class="h-10 w-10" />
        <span class="text-2xl font-bold text-indigo-600">ShopEasy</span>
      </div>



      <!-- Navigation / Cart -->
      <div class="flex items-center space-x-6">
        <!-- Wishlist / Account (optional) -->
        <BaseButton class="px-4" variant="danger" @click="handleLogout">Logout</BaseButton>
        
        <!-- Cart -->
      
      </div>
    </div>
  </header>
</template>

<script setup>
import BaseButton from './ui/BaseButton.vue';
import { useAuthStore } from "@/stores/authStore"; // Import your store
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logoutUser()
  router.push("/login")
}

</script>
