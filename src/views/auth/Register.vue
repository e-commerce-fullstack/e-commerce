<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
    <div class="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-8 mx-4">
      <h1 class="text-3xl font-bold text-center mb-2">Create account</h1>
      <p class="text-center text-gray-500 mb-8">Sign up to get started</p>

      <form @submit.prevent="handleRegister" class="space-y-5">

        <BaseInput v-model="name" label="Name" placeholder="name" required />
        <BaseInput v-model="email" label="Email" placeholder="email" type="email" required />
        <BaseInput v-model="password" label="Password" placeholder="password" type="password" required />


        <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

        <BaseButton type="submit" :disabled="isLoading" variant="primary" @click="handleRegister">
          {{ isLoading ? 'Signing Up...' : 'Sign Up' }}
        </BaseButton>

        <div class="text-center"><span class="me-2">Already have account?</span>
          <RouterLink class="text-blue-600 hover:text-blue-800 underline" to="/login">login</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { ref } from 'vue'
const authStore = useAuthStore();
const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

const errorMessage = ref("");
const isLoading = ref(false);

const handleRegister = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await authStore.registerUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    alert("Registration successful!");
    router.push("/login");
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Registration failed";
  } finally {
    isLoading.value = false;
  }
};

</script>
