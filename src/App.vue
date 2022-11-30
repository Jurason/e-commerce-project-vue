<template>
  <nav>
    <div class="nav__tabs">
			<router-link to="/">Home</router-link> |
			<router-link to="/checkout">Checkout</router-link> |
			<router-link to="/map">Map Experiments</router-link> |
			<router-link to="/table">Table Experiments</router-link>
		</div>
		<SearchBar v-if="products.length"/>
  </nav>
	<router-view v-if="products.length" />
	<LoadingBar v-else/>
	<div class="api-error" v-if="apiError">Something wrong with serve response!</div>
</template>

<script>
import { loadData } from "./api";
import LoadingBar from "./components/LoadingBar";
import SearchBar from "./components/SearchBar";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "App",
	components:{
		LoadingBar,
		SearchBar
	},
	async mounted() {
		//api request
		const apiResponseData = await loadData()
		//error handling
		if(typeof apiResponseData !== "object"){
			this.apiError = true
			setTimeout(() => {
				this.apiError = false
				this.$router.push({path: '/checkout'})
				this.store.push({
					id: 0,
					title: 'No data'
				})
			}, 3000)
			return
		}
		//fill cart
		this.FILL_CART_LOCALSTORAGE()
		//fill store
		this.FILL_STORE(apiResponseData)
	},
	data() {
    return {
			apiError: false,
    };
  },
	methods: {
		...mapMutations(['FILL_STORE', 'FILL_CART_LOCALSTORAGE'])
	},
	computed: {
		...mapGetters({
			products: "getProducts",
		})
	},
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
	background-color: rgb(212, 212, 212);
	min-height: 100vh;
}

nav {
	width: 80%;
	height: 10vh;
	margin: 0 auto 20px auto;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 30px;
	border-bottom: 1px solid black;
	.nav__tabs {
		margin-right: 100px;
		a {
			font-weight: bold;
			color: #2c3e5087;

			&.router-link-exact-active {
				color: #2c3e50;
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
	z-index: 100;
}
.close-icon:hover {
	opacity: 0.5;
}
</style>
