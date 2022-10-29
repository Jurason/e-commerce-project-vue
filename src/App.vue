<template>
  <nav>
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
	},
  data() {
    return {
      store: [],
			cart: [],
			getProducts: () => this.store,
			getProductFromStore: (product) => {
				return this.findProductInStore(product)
			},
			removeOrderedItemsFromStore: () => {
				this.cart.forEach((product) => {
					const currentProduct = this.findProductInStore(product);
					currentProduct.stock -= product.stock;
				});
			},
			emptyCart: () => this.cart = [],
			getCartProducts: () => this.cart,
			getProductFromCart: (product) => {
				return this.findProductInCart(product)
			},
			updateProductToCart: (item, quantity) => {
				const itemToCart = JSON.parse(JSON.stringify(item));
				itemToCart.stock = parseInt(quantity);
				if (!this.findProductInCart(itemToCart)) {
					this.cart.push(itemToCart);
				} else {
					const alreadyAdded = this.findProductInCart(itemToCart);
					alreadyAdded.stock += itemToCart.stock;
				}
			},
			getCartTotal: () => {
				const subTotal = this.cart.reduce((acc, el) => acc + el.price * el.stock,0);
				const total = subTotal * (1 + SHIPPING_RATE);
				return { subTotal: subTotal, total: total };
			},
			removeProductFromCart(item) {
				const index = this.cart.findIndex((el) => el.id === item.id);
				this.cart.splice(index, 1);
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
	},
	computed: {
		test(){
			console.log('root computed')
			this.getCartTotal()
			return false
		}
	},
	watch: {
		test(){
			console.log('something was changed in root element!')
		}
	}
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
