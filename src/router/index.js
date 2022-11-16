import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/checkout",
    component: () => import('../views/Checkout'),
  },
  {
    path: "/products/:productName",
    name: 'productCard.show',
    component: () => import('../views/ProductShow'),
    props: route => ({productName: route.params.productName}),
    children: [
      {
        path: ":tabName",
        name: 'productCard.info',
      },
    ]
  },
  {
    path: "/search/:query",
    name: 'searchResults.show',
    component: () => import('../views/SearchResultsView'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
