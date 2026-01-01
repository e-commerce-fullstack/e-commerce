import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/pages/Home.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/auth/Register.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/pages/Checkout.vue")
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/views/pages/Order.vue")
    }

  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) {
    return "/login";
  }
});

export default router;
