<template>
	<img v-show="currentSlideIndex === index" :src="slide" alt="">
</template>

<script>
export default {
	name: "CarouselItem",
	props: {
		slide: {type: String, required: true},
		index: {type: Number, required: true},
		currentSlideIndex: {type: Number, required: true},
	},
}
</script>

<style scoped>
</style>