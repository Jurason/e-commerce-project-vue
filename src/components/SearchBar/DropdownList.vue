<template>
	<ul @mouseover="resetDropdownIndex" class="search-block__results">
		<li
				@click="$emit('emptyInput')"
				v-for="(product, index) in handledList" :key="product.id"
				:class="{'focused': index === currentDropdownIndex}"
				class="search-block__results__item item"
		>
			<router-link :to="{name: 'productCard.show', params: {productName: product.title}}">
				<slot name="item" :item="product"></slot>
			</router-link>
		</li>
	</ul>
</template>

<script>
export default {
	name: "DropdownList",
	props: {
		itemsList: {type: Array, required: false}
	},
	emits: {
		'emptyInput': null
	},
	data(){
		return {
			currentDropdownIndex: -1,
		}
	},
	mounted(){
		window.addEventListener('keydown', this.keydownHandler)
	},
	beforeUnmount(){
		window.removeEventListener('keydown', this.keydownHandler)
	},
	computed: {
		handledList(){
			return this.itemsList.slice(0,10)
		},
	},
	methods: {
		keydownHandler(e){
			if(e.key === 'ArrowUp'){
				this.currentDropdownIndex--
				if(this.currentDropdownIndex < 0) this.currentDropdownIndex = -1
			}
			if(e.key === 'ArrowDown'){
				this.currentDropdownIndex++
				if(this.currentDropdownIndex > this.handledList.length - 1) this.currentDropdownIndex = 0
			}
		},
		resetDropdownIndex(){
			this.currentDropdownIndex = -1
		},
	},
}
</script>

<style lang="scss" scoped>
.search-block__results {
	padding: 0;
}
.search-block__results__item {
	display: flex;
	align-items: center;
	color: white;
	text-align: left;
	a {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		cursor: pointer;
	}
}
.search-block__results__item:hover {
	background-color: lightgrey;
}
.focused {
	background-color: lightgrey;
}
</style>