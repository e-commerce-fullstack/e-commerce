<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
    <div class="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-8 mx-4">
      <h1 class="text-3xl font-bold text-center mb-2">Welcome back</h1>
      <p class="text-center text-gray-500 mb-8">Sign in to your account</p>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <BaseInput v-model="email" label="Email" type="email" placeholder="email@example.com" required />
        <BaseInput v-model="password" label="Password" type="password" placeholder="••••••••" required />

        <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

        <BaseButton type="submit" variant="primary" :disabled="isLoading" @click="handleLogin">
          {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </BaseButton>

        <div class="text-center">
          <span class="me-2">don't have account?</span>
          <RouterLink class="text-blue-600 hover:text-blue-800 underline" to="/register">register</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore"; // Import your store
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await authStore.loginUser({
      email: email.value,
      password: password.value,
    });

    await authStore.verifyToken(); // optional, fetches user

    router.push("/");
    alert("Login successful");
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};


</script>