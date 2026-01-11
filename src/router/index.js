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
    },
    {
      path: "/admin",
      component: () => import("@/modules/admin/views/Dashboard.vue"),
      meta: { requiresAuth: true, requiresAdmin: true }, // Optional: protect admin routes
      children: [
        {
          path: "", // Default path /admin
          name: "admin-dashboard",
          component: () => import("@/modules/admin/views/Orders.vue"),
        },
        {
          path: "payments",
          name: "admin-payments",
          component: () => import("@/modules/admin/views/Orders.vue"),
        },
        {
          path: "products",
          name: "admin-products",
          component: () => import("@/modules/admin/views/Products.vue"),
        },
        {
          path: "customer",
          name: "admin-customer",
          component: () => import("@/modules/admin/views/Customer.vue")
        }
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  // 1. Handle Authentication
  if (to.meta.requiresAuth) {
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

  // 2. Handle Admin Authorization
  // This checks if the route path starts with /admin
  if (to.path.startsWith('/admin')) {
    // If user is not logged in OR role is not admin, kick them to home
    if (!authStore.user || authStore.user.role !== 'admin') {
      console.warn("Unauthorized access to admin area");
      return { name: "home" }; 
    }
  }
});


export default router;
