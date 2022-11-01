//TODO
// [ ] Один компонент для продуктовой карточки со слотом под добавление/удаления из корзины ()
// [ ] Привести в порядок CSS в соответствии с BEM
// [ ] Сделать страницу товара (по примеру розетки)
// [ ] Валидацию на инпуты
// [x] Добавить изображения
// [x] Transition Group
// [x] Рефакторинг компонента корзины CartList

<template>
  <nav style="text-align: left; width: 80%; margin: auto">
    <router-link to="/">Home</router-link> |
    <router-link to="/checkout">Checkout</router-link>
  </nav>
  <router-view />
</template>

<script>
import { loadData } from "./api";

const SHIPPING_RATE = 0.05
export const SHIPPING_FEE = SHIPPING_RATE * 100 + "%"

export default {
  name: "App",
	async mounted() {
		await loadData().then(data => this.store = data.products)
		this.getFromLocalStorage()
	},
	data() {
    return {
      store: [],
			cart: [],
			getProductFromStore: (product) => {
				return this.findProductInStore(product)
			},
			removeOrderedItemsFromStore: () => {
				this.cart.forEach((product) => {
					const currentProduct = this.findProductInStore(product);
					currentProduct.stock -= product.stock;
				});
			},
			emptyCart: () => {
				this.cart = []
				this.setToLocalStorage()
			},
			getProductFromCart: (product) => {
				return this.findProductInCart(product)
			},
			updateProductInCart: (item, quantity) => {
				const itemToCart = JSON.parse(JSON.stringify(item));
				itemToCart.stock = parseInt(quantity);
				if (!this.findProductInCart(itemToCart)) {
					this.cart.push(itemToCart);
				} else {
					const alreadyAdded = this.findProductInCart(itemToCart);
					alreadyAdded.stock += itemToCart.stock;
				}
				this.setToLocalStorage()
			},
			getCartTotal: () => {
				const subTotal = this.cart.reduce((acc, el) => acc + el.price * el.stock,0);
				const total = subTotal * (1 + SHIPPING_RATE);
				return { subTotal: subTotal, total: total };
			},
			removeProductFromCart: (item) => {
				const index = this.cart.findIndex((el) => el.id === item.id);
				this.cart.splice(index, 1);
				this.setToLocalStorage()
			},
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
		}
	},
	computed: {},
	watch: {}
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
