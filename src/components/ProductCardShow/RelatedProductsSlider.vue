<template>
	<div class="list__wrapper">
		<button :disabled="!prevButtonIsActive" @click="prev" class="slider-controls left">&#8656;</button>
		<button :disabled="!nextButtonIsActive" @click="next" class="slider-controls right">&#8658;</button>
		<ul class="related__products__list">
			<li class="related__products__item" v-for="(product, index) in paginatedList" :key="product.id" :data-index="index">
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
	props:{
		productList: {type: Array, required: true},
		listLength: {type: Number, required: false}
	},
	mounted(){
		this.interval = this.listLength || 6
	},
	data(){
		return{
			indexStart: 0,
			interval: null,
		}
	},
	computed: {
		paginatedList(){
			this.checkBoundaryConditions()
			return this.productList.slice(this.indexStart, this.indexStart + this.interval)
		},
		nextButtonIsActive(){
			return this.indexStart < this.productList.length - this.interval
		},
		prevButtonIsActive(){
			return !!this.indexStart
		}
	},
	methods: {
		prev(){
			this.indexStart -= this.interval
		},
		next(){
			this.indexStart += this.interval
		},
		checkBoundaryConditions(){
			this.indexStart = Math.max(this.indexStart, 0)
			const indexEnd = this.indexStart + this.interval
			this.indexStart = indexEnd > this.productList.length - 1 ? this.productList.length - this.interval : this.indexStart
		},
	},
}
</script>

<style scoped>
.list__wrapper {
	position: relative;
	margin: auto;
	height: 30vh;
	width: fit-content;
	max-width: 100%;
}
.related__products__list {
	list-style: none;
	height: 100%;
	display: flex;
	gap: 10px;
	justify-content: center;
}
.related__products__item {
	width: 200px;
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
	right: -40px;
}

</style>