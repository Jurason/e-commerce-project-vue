import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Checkout from "../views/Checkout.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/checkout", component: Checkout },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
