<template>
	<div class="list__wrapper">
		<button @click="prev" class="slider-controls left"></button>
		<button @click="next" class="slider-controls right"></button>
		<div class="list__inner__wrapper">
		<ul ref="list" class="related__products__list">
			<li class="related__products__item" v-for="product in productList" :key="product.id">
				<ProductCard :product="product">
					<template></template>
				</ProductCard>
			</li>
		</ul>
		</div>
	</div>
</template>

<script>
import ProductCard from "../ProductCard";
export default {
	name: "RelatedProductsSlider",
	components: {
		ProductCard
	},
	data(){
		return{
			position: 0
		}
	},
	computed: {
		productList(){
			return this.$root.$data.store
		},
	},
	cardWidth: 180,
	methods: {
		prev(){
			this.position += this.$options.cardWidth * 4
			this.position = Math.min(this.position, 0)
			this.$refs.list.style.marginLeft = this.position + 'px'
		},
		next(){
			this.position -= this.$options.cardWidth * 4
			this.position = Math.max(this.position, -this.$options.cardWidth * (this.productList.length - 6))
			this.$refs.list.style.marginLeft = this.position + 'px'
		}
	}
}
</script>

<style scoped>
.list__wrapper {
	position: relative;
	margin: auto;
	width: calc(7 * 180px + 4 * 30px);
}
.list__inner__wrapper {
	overflow-x: hidden;
	margin: auto;
}
.related__products__list {
	position: relative;
	list-style: none;
	display: flex;
	gap: 30px;
	overflow-x: hidden;
	transition: .8s;
}
.related__products__item {
	min-width: 180px;
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