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
    path: "/map",
    component: () => import('../MapExperiments/MapView'),
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
        prop: route => ({tabName: route.params.tabName})
      },
    ]
  },
  {
    path: "/search/:query",
    name: 'searchResults.show',
    component: () => import('../MainPage/SearchResultsView'),
    prop: route => ({query: route.params.query})
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
