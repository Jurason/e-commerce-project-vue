<template>
	<NoResults v-if="!filteredItems.length"/>
	<transition-group
			name="list"
			@before-enter="onBeforeEnter"
			@enter="onEnter"
	>
		<div class="product-list__item" v-for="(item, index) in filteredItems" :key="item.id" :data-index="index">
			<slot name="product" :product="item"></slot>
		</div>
	</transition-group>
</template>

<script>
import NoResults from "./NoResults";

import gsap from 'gsap'

export default {
	name: "ProductCardList",
	components: {
		NoResults
	},
	props: {
		products: {type: Object, required: true},
		filterOptions: {type: Object, required: true}
	},
	computed: {
		filteredItems(){
			if(!this.filterOptions.input && Object.keys(this.filterOptions).every(key => this.filterOptions[key] === false)){
				return this.products
			}
			const filteredProducts = this.products.filter(item => {
				return item.title.toUpperCase().includes(this.filterOptions.input.toUpperCase())
			})
			if(this.filterOptions.byPrice){
				filteredProducts.sort((a, b) => a.price - b.price)
			}
			if(this.filterOptions.byName) {
				filteredProducts.sort((a, b) => {
					const nameA = a.title.toUpperCase()
					const nameB = b.title.toUpperCase()
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
				})
			}
			if(this.filterOptions.byStockBalance){
				filteredProducts.sort((a, b) => b.stock - a.stock)
			}
			return filteredProducts
		},
	},
	methods: {
		onBeforeEnter(el) {
			el.style.opacity = 0
		},
		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				delay: el.dataset.index * 0.1,
				onComplete: done
			})
		},
	}
}
</script>

<style scoped>
.list-move {
	transition: transform 1s;
}
.product-list__item {
	width: 200px;
	height: 300px;
}
</style>