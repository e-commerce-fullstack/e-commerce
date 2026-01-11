<template>
<nav class="fixed top-0 z-50 w-full bg-[#faf7f5] border-b border-neutral-200">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex h-20 items-center justify-between">
      <a href="#" class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="h-12 w-12" />
        <span class="text-lg font-semibold tracking-wide text-neutral-900">
          E-SHOP
        </span>
      </a>
      <ul class="hidden md:flex items-center gap-10 text-sm font-medium text-neutral-700">
        <li>
          <a href="#" class="text-red-500 hover:text-red-600 transition">
            Home
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-neutral-900 transition">
            About
          </a>
        </li>
        <li>
          <a href="#" class="transition">
           Contact Us
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-neutral-900 transition">
            Blog
          </a>
        </li>
      </ul>
      <div class="flex items-center gap-4">
        <div class="relative hidden md:block">
          <input
            type="text"
            placeholder="Search products..."
            class="w-64 rounded-full bg-[#f1e9e6] pl-10 pr-4 py-2 text-sm text-neutral-700 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          />
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"/>
          </svg>
        </div>
        <button class="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
          <svg class="h-5 w-5 text-neutral-700" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 0 0 6.52 17H19m-12 0a1 1 0 1 0 0 2m10-2a1 1 0 1 0 0 2"/>
          </svg>
          <span class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        <!-- Avatar -->
        <router-link v-if="authStore.user?.role === 'admin'" to="/admin/payments"
            class="text-sm font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide border-2 border-indigo-600 px-3 py-1.5 rounded-md transition-colors">
            Admin Panel
          </router-link>

          <BaseButton v-if="authStore.isAuthenticated" class="px-4 py-2" variant="danger" @click="handleLogout">Logout
          </BaseButton>
          <BaseButton v-else class="px-4 py-2" variant="primary_2" @click="router.push('/login')">Login</BaseButton>
        <button class="h-10 w-10 rounded-full bg-[#F0C5AE] border-2 border-[#EFA996]  flex justify-center items-center">
          0
        </button>
      </div>

    </div>
  </div>
</nav>



  <!-- Navbar Wrapper -->
  

<!-- Navbar Wrapper -->
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

const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add(
        "top-2.5",
        "py-2.5",
        "bg-white/95",
        "shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
      );
      navbar.classList.remove("top-5", "py-4");
    } else {
      navbar.classList.remove(
        "top-2.5",
        "py-2.5",
        "bg-white/95",
        "shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
      );
      navbar.classList.add("top-5", "py-4");
    }
  });


</script>
