<template>
	<div @click="filterHandler($event)">
		Filter: <input
			v-model="filter.input"
			@input="filterHandler($event)"
			type="text">
		<div class="filter-option">
			<input @click="filter.byPrice = !filter.byPrice" type="checkbox"> by price <br>
			<input @click="filter.byName = !filter.byName" type="checkbox"> by name <br>
			<input @click="filter.byStockBalance = !filter.byStockBalance" type="checkbox"> by stock balance
		</div>
	</div>
</template>

<script>
export default {
	name: "FilterOptions",
	data(){
		return{
			filter: {
				input: '',
				byPrice: false,
				byName: false,
				byStockBalance: false
			},
		}
	},
	methods: {
		filterHandler(e){
			if(e.target.tagName !== 'INPUT'){
				return
			}
			this.$emit('filter', this.filter)
		}
	}
}
</script>

<style scoped>
 input {
 outline: none;
 }
</style>