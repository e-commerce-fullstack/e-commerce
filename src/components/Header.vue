<template>
  <header class="bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ease-in-out">
    <div class="max-w-7xl mx-auto flex items-center justify-between p-4">

      <RouterLink to="/" class="flex items-center space-x-2">
        <img src="/logo.png" alt="ShopEasy" class="h-10 w-10" />
        <span class="text-2xl font-bold text-indigo-600">E-Shop</span>
      </RouterLink>


      <div class="flex items-center space-x-8">
        <div class="flex items-center space-x-6">

          <router-link v-if="authStore.user?.role === 'admin'" to="/admin/payments"
            class="text-sm font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide border-2 border-indigo-600 px-3 py-1.5 rounded-md transition-colors">
            Admin Panel
          </router-link>

          <BaseButton v-if="authStore.isAuthenticated" class="px-4 py-2" variant="danger" @click="handleLogout">Logout
          </BaseButton>
          <BaseButton v-else class="px-4 py-2" variant="primary_2" @click="router.push('/login')">Login</BaseButton>

        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import BaseButton from './ui/BaseButton.vue';
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();


const handleLogout = () => {
  authStore.logoutUser()
  router.push("/login")
}

// optional: verify token with backend once when component mounts
authStore.verifyToken?.();


</script>
