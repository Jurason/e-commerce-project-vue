<template>
	<div v-if="noMatchesFound">No results!</div>
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
			if(!this.filter.input && Object.keys(this.filter).every(key => this.filter[key] === false)){
				return this.$root.$data.store
			}
			const filteredProducts = this.$root.$data.store.filter(item => {
				return item.title.toUpperCase().includes(this.filter.input.toUpperCase())
			})
			if(this.filter.byPrice){
				filteredProducts.sort((a, b) => a.price - b.price)
			}
			if(this.filter.byName) {
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
			if(this.filter.byStockBalance){
				filteredProducts.sort((a, b) => b.stock - a.stock)
			}
			return filteredProducts
		},
		noMatchesFound(){
			return !this.filteredItems.length
		}
	}
}
</script>

<style scoped>
.item {
	width: 25%;
}
</style>