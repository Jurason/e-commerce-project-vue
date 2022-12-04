import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store"
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App)
    .use(router)
    .use(store)
    .use(BootstrapVue3)
    .mount("#app");

store.subscribe( (mutation, state) => {
    localStorage.setItem('cartProducts', JSON.stringify(state.cart));
})
//Sync tabs
// window.addEventListener('storage', () => {
//     store.commit('FILL_CART_LOCALSTORAGE')
// });

