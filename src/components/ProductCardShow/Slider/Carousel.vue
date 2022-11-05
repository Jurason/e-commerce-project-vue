<template>
	<div class="carousel__wrapper">
			<button @click="prev" class="carousel__controls left">Prev</button>
			<button @click="next" class="carousel__controls right">Next</button>
		<CarouselItem v-for="(slide, index) in slides"
									:key="slide"
									:slide="slide"
									:index="index"
									:currentSlideIndex="currentSlideIndex" class="carousel__item"/>
		<div class="carousel__slides--row">
			<div class="carousel__slides--row__item" v-for="(slide, index) in slides" :key="slide">
				<img @click="setCurrentSlideIndex(index)" :class="{'active': currentSlideIndex === index}" :src="slide" alt="">
			</div>
		</div>
	</div>
</template>

<script>
import CarouselItem from "./CarouselItem";
export default {
	name: "CarouselComponent",
	components: {CarouselItem},
	props: {
		slides: {type: Array, required: true}
	},
	data() {
		return {
			currentSlideIndex: 0,
		}
	},
	methods: {
		setCurrentSlideIndex(index){
			this.currentSlideIndex = index
		},
		next(){
			const index = this.currentSlideIndex < this.slides.length - 1 ? this.currentSlideIndex + 1 : 0
			this.setCurrentSlideIndex(index)
		},
		prev(){
			const index = this.currentSlideIndex > 0 ? this.currentSlideIndex - 1 : this.slides.length - 1
			this.setCurrentSlideIndex(index)
		}
	}
}
</script>

<style scoped>
	.carousel__wrapper {
		position: relative;
		width: 50%;
		height: 100%;
	}
	.carousel__item {
		height: 75%;
		max-width: 100%;
	}
	.carousel__controls {
		position: absolute;
		top: 40%;
		height: 50px;
		width: 70px;
		border-radius: 10px;
		border: none;
		opacity: .7;
		cursor: pointer;
	}
	.left {
		left: 0;
	}
	.right {
		right: 0;
	}
	.carousel__slides--row {
		display: flex;
		height: 20%;
		gap: 20px;
	}
	.carousel__slides--row__item {
		width: 25%;
	}
	.carousel__slides--row__item img {
		max-width: 100%;
		max-height: 100%;
		opacity: .6;
		cursor: pointer;
	}
	.active {
		border: 2px solid green;
	}

</style>