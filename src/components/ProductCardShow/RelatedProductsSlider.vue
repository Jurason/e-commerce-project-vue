<template>
	<div class="list__wrapper">
		<button @click="prev" class="slider-controls left"></button>
		<button @click="next" class="slider-controls right"></button>
		<ul ref="list" class="related__products__list">
			<li class="related__products__item" v-for="product in productList" :key="product.id">
				<ProductCard :product="product">
					<template></template>
				</ProductCard>
			</li>
		</ul>
	</div>
</template>

<script>
import ProductCard from "../ProductCard";
export default {
	name: "RelatedProductsSlider",
	components: {
		ProductCard
	},
	computed: {
		productList(){
			return this.$root.$data.store
		}
	},
	methods: {
		prev(){
			this.$refs.list.style.marginLeft = 900 + 'px'
		},
		next(){
			this.$refs.list.style.marginLeft = -900 + 'px'
		}
	}
}
</script>

<style scoped>
.list__wrapper {
	position: relative;
}
.related__products__list {
	position: relative;
	list-style: none;
	display: flex;
	gap: 30px;
	overflow: hidden;
}
.related__products__item {
	display: inline-block;
	min-width: calc(100vw / 9);
	max-height: 30vh;
}
.slider-controls {
	position: absolute;
	height: 50px;
	width: 30px;
	top: calc(50% - 25px);
	opacity: .6;
	z-index: 101;
}
.left {
	left: 0;
}
.right {
	right: 0;
}
</style>