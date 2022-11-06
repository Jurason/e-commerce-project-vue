<template>
	<CarouselComponent :slides="productImages"/>
	<div class="product__main__info">Overview information!!!</div>
</template>

<script>
import CarouselComponent from './Slider/Carousel'

export default {
	name: "ProductOverviewComponent",
	props: {
		product: {type: Object, required: true}
	},
	components: {
		CarouselComponent
	},
	computed: {
		productImages(){
			return this.$root.$data.getProductFromStore(this.product).images
		}
	}
}
</script>

<style scoped>
	.product__main__info {
		width: 50%;
		margin: auto;
	}
</style>