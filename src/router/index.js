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
      component: () => import("@/modules/shop/views/Checkout.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/modules/shop/views/Order.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/payment/:id",
      name: "payment",
      component: () => import("@/modules/shop/views/Payment.vue"),
      meta: {requiresAuth: true}
    }
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    // try refresh if no access token
    if (!authStore.accessToken && authStore.refreshTokenValue) {
      try {
        await authStore.refreshAccessToken();
      } catch {
        return { name: "login" };
      }
    }

    if (!authStore.accessToken) {
      return { name: "login" };
    }
  }
});


export default router;
