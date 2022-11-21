import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../MainPage/HomeView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/checkout",
    component: () => import('../CartPage/Checkout'),
  },
  {
    path: "/products/:productName",
    name: 'productCard.show',
    component: () => import('../ProductPage/ProductShow'),
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
    component: () => import('../MainPage/SearchResultsView'),
  },
  {
    path: "/map",
    name: "map.show",
    component: () => import('../MapExperiments/MapView')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
