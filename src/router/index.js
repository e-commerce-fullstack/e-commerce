import { createRouter, createWebHistory } from "vue-router";
import Home from "@/modules/shop/views/Home.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/modules/auth/views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/modules/auth/views/Register.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/modules/shop/views/Checkout.vue")
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/modules/shop/views/Order.vue")
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
