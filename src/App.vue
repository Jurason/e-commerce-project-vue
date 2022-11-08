//TODO
// [ ] Один компонент для продуктовой карточки со слотом под добавление/удаления из корзины ()
// [ ] Валидацию на пропсы и эмитсы
// [ ] Сделать страницу товара (по примеру розетки)
// [ ] Сделать карусель с пагинацией
// [ ] Привести в порядок CSS в соответствии с BEM
// [x] Обработка ошибок API
// [x] Валидацию на инпуты
// [x] Добавить компонент загрузки во время загрузки данных
// [x] Lazy Load
// [x] Добавить изображения
// [x] Transition Group
// [x] Рефакторинг компонента корзины CartList

// [?] Переписать на Vuex

<template>
  <nav style="text-align: left; width: 80%; margin: auto">
    <router-link to="/">Home</router-link> |
    <router-link to="/checkout">Checkout</router-link>
  </nav>
	<router-view v-if="store.length" />
	<LoadingBar v-else/>
	<div class="api-error" v-if="apiError">Something wrong with serve response!</div>
</template>

<script>
import { loadData } from "./api";
import LoadingBar from "./components/LoadingBar";

const SHIPPING_RATE = 0.05
export const SHIPPING_FEE = SHIPPING_RATE * 100 + "%"

export default {
  name: "App",
	components:{
		LoadingBar
	},
	async mounted() {
		const apiResponse = await loadData()
		if(apiResponse.status !== 200){
			this.apiError = true
			return
		}
		this.store = apiResponse.data
		console.log('this.store:', this.store)
		this.getFromLocalStorage()
	},
	data() {
    return {
      store: [],
			cart: [],
			apiError: false,

			cartTotal: () => this.getCartTotal,
			getProductFromStore: (product) => this.findProductInStore(product),
			getProductFromCart: (product) => this.findProductInCart(product),

			updateProductInCart: (item, quantity) => this.updateCart(item, quantity),
			removeProductFromCart: (item) => this.removeFromCart(item),
			removeOrderedItemsFromStore: () => this.removeOrdered(),
			emptyCart: () => this.clearCart(),
    };
  },
	methods: {
		findProductInCart(product) {
			return this.cart.find((t) => t.id === product.id);
		},
		findProductInStore(product) {
			return this.store.find((t) => t.id === product.id);
		},
		setToLocalStorage(){
			localStorage.setItem('cart-products', JSON.stringify(this.cart))
		},
		getFromLocalStorage(){
			const cartProducts = localStorage.getItem('cart-products')
			if(cartProducts){
				this.cart = JSON.parse(cartProducts)
			}
		},
		removeFromCart(item){
			const index = this.cart.findIndex((el) => el.id === item.id);
			this.cart.splice(index, 1);
			this.setToLocalStorage()
		},
		removeOrdered(){
				this.cart.forEach((product) => {
				const currentProduct = this.findProductInStore(product);
				currentProduct.stock -= product.stock;
			})
		},
		updateCart(item, quantity){
				const itemToCart = JSON.parse(JSON.stringify(item));
				if(!quantity){
					return
				}
				itemToCart.stock = parseInt(quantity);
				if (!this.findProductInCart(itemToCart)) {
					this.cart.push(itemToCart);
				} else {
					const alreadyAdded = this.findProductInCart(itemToCart);
					alreadyAdded.stock = itemToCart.stock;
				}
				this.setToLocalStorage()
			},
		clearCart(){
			this.cart = []
			this.setToLocalStorage()
		}
	},
	computed: {
		getCartTotal() {
			const subTotal = this.cart.reduce((acc, el) => acc + el.price * el.stock,0);
			const total = subTotal * (1 + SHIPPING_RATE);
			return { subTotal: subTotal, total: total };
		},
	},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
