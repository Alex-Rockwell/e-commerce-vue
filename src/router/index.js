import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/cart",
      component: () => import("../views/CartPage.vue"),
    },
  ],
});

export default router;
