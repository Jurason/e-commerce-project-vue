<template>
	<div class="slider">
		<BaseButton :disabled="!prevButtonIsActive" name="&#8656;" @click="prev" class="slider__controls left"/>
		<BaseButton :disabled="!nextButtonIsActive" name="&#8658;" @click="next" class="slider__controls right"/>
		<div ref="wrapper" class="slider__inner__wrapper">
			<ul ref="list" class="slider__content">
				<li class="slider__content__item" v-for="product in productList" :key="product.id">
					<ProductCard :product="product">
						<template></template>
					</ProductCard>
				</li>
			</ul>
		</div>
		<div class="slider__indicators">
			<div ref="indicators" v-for="(item, index) in indicatorsQuantity"
				:key="item.id"
				class="slider__indicators__item"
				:class="{'active': currentIndicatorIndex === index}"
			></div>
		</div>
	</div>
</template>

<script>
import ProductCard from "../../MainPage/components/ProductCard";
import BaseButton from "../../components/BaseButton";

export default {
	name: "SliderRelatedProducts",
	components: {
		ProductCard,
		BaseButton
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
		return {
			position: 0,
			cardQuantity: null,
			cardWidth: null,
			currentIndicatorIndex: 0
		}
	},
	computed: {
		nextButtonIsActive(){
			return this.position !== this.positionMax
		},
		prevButtonIsActive(){
			return this.position
		},
		positionMax(){
			return -this.cardWidth * (this.productList.length - this.cardQuantity) - 10 * (this.productList.length - this.cardQuantity)
		},
		indicatorsQuantity(){
			if(!this.cardQuantity){
				return
			}
			return Math.ceil(this.productList.length / this.cardQuantity)
		},
	},
	methods: {
		prev(){
			this.position += this.cardWidth * this.cardQuantity + 10 * this.cardQuantity
			this.position = Math.min(this.position, 0)
			this.$refs.list.style.marginLeft = this.position + 'px'
			this.currentIndicatorIndex--
		},
		next(){
			this.position -= this.cardWidth * this.cardQuantity + 10 * this.cardQuantity
			this.position = Math.max(this.position, this.positionMax)
			this.$refs.list.style.marginLeft = this.position + 'px'
			this.currentIndicatorIndex++
		},
		resizeHandler(){
			if(window.innerWidth > 1440) this.cardQuantity = this.cardCount || this.$options.defaultCardQuantity
			if(window.innerWidth < 1440) this.cardQuantity = Math.min(this.cardCount,this.$options.defaultCardQuantity - 1) || 5
			if(window.innerWidth < 1200) this.cardQuantity = Math.min(this.cardCount,this.$options.defaultCardQuantity - 2) || 4
			if(window.innerWidth < 970) this.cardQuantity = Math.min(this.cardCount,this.$options.defaultCardQuantity - 3) || 3
			this.setContainerWidth()
			this.indicatorIndexCheck()
		},
		setContainerWidth(){
			this.$refs.wrapper.style.width = this.cardQuantity * this.cardWidth + (this.cardQuantity - 1) * 10 + 'px'
		},
		indicatorIndexCheck(){
			// this.currentIndicatorIndex = this.currentIndicatorIndex > this.indicatorsQuantity - 1 ? this.indicatorsQuantity - 1 : this.currentIndicatorIndex
			// this.currentIndicatorIndex = this.currentIndicatorIndex < 0 ? 0 : this.currentIndicatorIndex
		}
	},
}
</script>

<style lang="scss" scoped>
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
.slider__indicators {
	display: flex;
	margin: 10px 0 10px 0;
	gap: 10px;
	justify-content: center;
}
.slider__indicators__item {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: green;
	opacity: .5;

}
.active {
	opacity: 1;
	scale: 1.4;
}
.slider__controls {
	position: absolute;
	height: 50px;
	width: 30px;
	top: calc(50% - 25px);
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