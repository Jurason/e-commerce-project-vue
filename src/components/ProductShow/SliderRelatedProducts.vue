<template>
	<div class="slider">
		<button :disabled="!prevButtonIsActive" @click="prev" class="slider__controls left">&#8656;</button>
		<button :disabled="!nextButtonIsActive" @click="next" class="slider__controls right">&#8658;</button>
		<div ref="wrapper" class="slider__inner__wrapper">
			<ul ref="list" class="slider__content">
				<li class="slider__content__item" v-for="product in productList" :key="product.id">
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
	name: "SliderRelatedProducts",
	components: {
		ProductCard
	},
	props:{
		productList: {type: Array, required: true},
		cardCount: {type: Number, required: false},
	},
	defaultCardQuantity: 6,
	defaultCardWidth: 180,
	mounted(){
		this.cardQuantity = this.cardCount || this.$options.defaultCardQuantity
		this.cardWidth = this.$options.defaultCardWidth
		this.resizeHandler()
		window.addEventListener('resize', this.resizeHandler)
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.resizeHandler)
	},
	data(){
		return{
			position: 0,
			cardQuantity: null,
			cardWidth: null,
		}
	},
	computed: {
		nextButtonIsActive(){
			return true
		},
		prevButtonIsActive(){
			return true
		},
	},
	methods: {
		prev(){
			this.position += this.cardWidth * this.cardQuantity + 10 * this.cardQuantity
			this.position = Math.min(this.position, 0)
			this.$refs.list.style.marginLeft = this.position + 'px'
		},
		next(){
			this.position -= this.cardWidth * this.cardQuantity + 10 * this.cardQuantity
			this.position = Math.max(this.position, -this.cardWidth * (this.productList.length - this.cardQuantity) - 10 * (this.productList.length - this.cardQuantity))
			this.$refs.list.style.marginLeft = this.position + 'px'
		},
		resizeHandler(){
			if(window.innerWidth > 1440) this.cardQuantity = this.cardCount || this.$options.defaultCardQuantity
			if(window.innerWidth < 1440) this.cardQuantity = Math.min(this.cardCount,this.$options.defaultCardQuantity - 1) || 5
			if(window.innerWidth < 1200) this.cardQuantity = Math.min(this.cardCount,this.$options.defaultCardQuantity - 2) || 4
			if(window.innerWidth < 970) this.cardQuantity = Math.min(this.cardCount,this.$options.defaultCardQuantity - 3) || 3
			this.setContainerWidth()
		},
		setContainerWidth(){
			this.$refs.wrapper.style.width = this.cardQuantity * this.cardWidth + (this.cardQuantity - 1) * 10 + 'px'
		}
	},
}
</script>

<style scoped>
.slider {
	position: relative;
	margin: auto;
	height: 30vh;
	width: fit-content;
	max-width: 100%;
}
.slider__inner__wrapper {
	margin: auto;
	overflow-x: hidden;
	height: 100%;
}
.slider__content {
	list-style: none;
	height: 100%;
	display: flex;
	gap: 10px;
	justify-content: flex-start;
	margin: 0;
	padding: 0;
	transition: all 1s ease;
}
.slider__content__item {
	height: 100%;
	min-width: 180px;
}
.slider__controls {
	position: absolute;
	height: 50px;
	width: 30px;
	top: calc(50% - 25px);
	opacity: .6;
	z-index: 101;
}
.left {
	left: -40px;
}
.right {
	right: -40px;
}
@media screen and (max-width: 320px){
	
}
</style>