<template>
	<div v-if="isCartEmpty">
		Your cart has no products!
		But it's never too late to
		<router-link to="/">buy something</router-link>
	</div>
	<div class="cart-list__item" v-for="item in cartProducts" :key="item.id">
		<slot name="product" :product="item"></slot>
	</div>
</template>

<script>
export default {
	name: "CartList",
	props: {
		cartProducts: {type: Object, required: true}
	},
	computed:{
		isCartEmpty(){
			return !this.cartProducts.length
		}
	}
}
</script>
<style scoped>
</style>