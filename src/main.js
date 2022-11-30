import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store"

createApp(App).use(router).use(store).mount("#app");

store.subscribe( (mutation, state) => {
    localStorage.setItem('cartProducts', JSON.stringify(state.cart));
})
//Sync tabs
// window.addEventListener('storage', () => {
//     store.commit('FILL_CART_LOCALSTORAGE')
// });

