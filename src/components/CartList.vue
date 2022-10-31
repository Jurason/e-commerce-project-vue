<template>
	<div v-if="isCartEmpty">
		Your cart has no products!
		But it's never too late to
		<router-link to="/">buy something</router-link>
	</div>
	<div class="item" v-for="item in $root.$data.cart" :key="item.id">
		<slot name="product" :product="item"></slot>
	</div>
</template>

<script>
export default {
	name: "CartList",
	computed:{
		isCartEmpty(){
			return !this.$root.$data.cart.length
		}
	}
}
</script>
<style scoped></style>