//TODO
// [ ] Сделать страницу товара (по примеру розетки)
// [x] Валидацию на пропсы и эмитсы
// [x] Строка поиска
// [x] Привести в порядок CSS в соответствии с BEM
// [x] Сделать карусель с пагинацией
// [x] Обработка ошибок API
// [x] Валидацию на инпуты
// [x] Добавить компонент загрузки во время загрузки данных
// [x] Lazy Load
// [x] Добавить изображения
// [x] Transition Group
// [x] Рефакторинг компонента корзины CartList

// [?] Переписать на Vuex

<template>
  <nav>
    <div class="nav__tabs">
			<router-link to="/">Home</router-link> |
			<router-link to="/checkout">Checkout</router-link>
		</div>
		<SearchBar :products="store"/>
  </nav>
	<router-view v-if="store.length" />
	<LoadingBar v-else/>
	<div class="api-error" v-if="apiError">Something wrong with serve response!</div>
</template>

<script>
import { loadData } from "./api";
import LoadingBar from "./components/LoadingBar";
import SearchBar from "./components/SearchBar";

const SHIPPING_RATE = 0.05
export const SHIPPING_FEE = SHIPPING_RATE * 100 + "%"

export default {
  name: "App",
	components:{
		LoadingBar,
		SearchBar
	},
	async mounted() {
		const apiResponse = await loadData()
		if(apiResponse.status !== 200){
			this.apiError = true
			return
		}
		this.store = apiResponse.data
		//page reload
		this.getFromLocalStorage()
		this.urlHandler()
	},
	data() {
    return {
      store: [],
			cart: [],
			apiError: false,
			searchResults: null,

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
		searchHandler(str){
			this.searchResults = this.store.filter(item => item.title.toLowerCase().includes(str))
		},
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
		urlHandler(){
			if(!this.$route.params?.query){
				this.searchResults = null
				return
			}
			this.searchHandler(this.$route.params.query)
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
	watch: {
		$route(){
			this.urlHandler()
		}
	}
};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
	width: 80%;
	margin: auto;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 30px;
	.nav__tabs {

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
}
.close-icon {
	position: absolute;
	right: 0;
	top: 0;
	padding: 10px;
	cursor: pointer;
	font-size: 20px;
}
.close-icon:hover {
	opacity: 0.5;
}
</style>
