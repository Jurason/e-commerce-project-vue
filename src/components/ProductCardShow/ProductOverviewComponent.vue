<template>
	<CarouselComponent :slides="productImages"/>
	<div>Overview information!!!</div>
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

</style>