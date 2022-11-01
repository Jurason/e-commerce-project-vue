<template>
	<div class="item" v-for="item in filteredItems" :key="item.id">
		<slot name="product" :product="item"></slot>
	</div>
</template>

<script>
export default {
	name: "ProductCardList",
	props: {
		filterOptions: {type: Object, required: true}
	},
	computed: {
		filteredItems(){
			if(!this.filterOptions.input && Object.keys(this.filterOptions).every(key => this.filterOptions[key] === false)){
				return this.$root.$data.store
			}
			const filteredProducts = this.$root.$data.store.filter(item => {
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
}
</script>

<style scoped>
.item {
	width: 25%;
}
</style>