import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: HomeView },
  {
    path: "/checkout",
    component: () => import('../views/Checkout')
  },
  {
    path: "/products/:productName",
    name: 'productCard.show',
    component: () => import('../views/ProductShow'),
    props: route => ({...route.params}),
    children: [
      {
        path: ":tabName",
        name: 'productCard.info',
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
