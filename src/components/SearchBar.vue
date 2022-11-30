<template>
	<div v-if="filteredList && isVisible" class="search-block__backdrop"></div>
	<div @click.stop class="search-block">
		<div class="search-block__bar">
			<input
					v-model="searchInput"
					class="search-block__bar__input" type="text" placeholder=""
					@focus="isVisible = true"
					ref="searchInput"
			>
		</div>
		<ul @mouseover="resetDropdownIndex" v-if="isVisible" class="search-block__results">
			<li
					@click="searchInput = ''"
					v-for="(product, index) in handledFilteredList" :key="product.id"
					:class="{'focused': index === currentDropdownIndex}"
					class="search-block__results__item"
			>
				<router-link style="text-decoration: none; width: 100%; cursor: pointer" :to="{name: 'productCard.show', params: {productName: product.title}}">
				{{ product.title }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
	name: "SearchBar",
	mounted(){
		this.products = this.getProducts
		window.addEventListener('keydown', this.keydownHandler)
		window.addEventListener('click', this.clickHandler)
	},
	beforeUnmount(){
		window.removeEventListener('keydown', this.keydownHandler)
		window.removeEventListener('click', this.clickHandler)
	},
	data() {
		return {
			products: [],
			searchInput: '',
			currentDropdownIndex: -1,
			isVisible: false
		}
	},
	computed: {
		...mapGetters({
			getProducts: "getProducts"
		}),
		filteredList(){
			return this.searchInput
					? this.products.filter(product => product.title.toLowerCase().includes(this.searchInput.toLowerCase()))
					: ''
		},
		handledFilteredList(){
			return this.filteredList.slice(0,10)
		},
		filteredListLength(){
			return this.filteredList.length
		},
	},
	methods: {
		resetDropdownIndex(){
			this.currentDropdownIndex = -1
		},
		keydownHandler(e){
			if(this.filteredListLength && e.key === 'Enter'){
				this.searchInput = this.currentDropdownIndex >= 0 ? this.filteredList[this.currentDropdownIndex].title : this.searchInput
				this.$refs.searchInput.blur()
				this.isVisible = false
				this.searchConfirm()
			}
			if(this.searchInput && e.key === 'ArrowUp'){
				this.currentDropdownIndex--
				if(this.currentDropdownIndex < 0) this.currentDropdownIndex = -1
			}
			if(this.searchInput && e.key === 'ArrowDown'){
				this.currentDropdownIndex++
				if(this.currentDropdownIndex > this.filteredListLength - 1) this.currentDropdownIndex = 0
			}
		},
		clickHandler(){
			this.isVisible = false
		},
		searchConfirm(){
			this.$router.push({name: 'searchResults.show', path: `/search`, params: {query: this.searchInput}})
		}
	},
	watch: {
		$route(){
			this.searchInput = this.$route.params.query || ''
		}
	}
}
</script>

<style lang="scss" scoped>
.search-block__backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 100;
	background-color: rgba(124, 124, 124, 0.55);
}

.search-block {
	flex-grow: 1;
	position: relative;
	margin: 0 50px;
	max-width: 500px;
	min-width: 300px;
	&__bar {
		&__input {
			position: relative;
			width: 100%;
			height: 30px;
			outline: none;
			z-index: 100;
		}
	}
	&__results {
		position: absolute;
		display: flex;
		height: fit-content;
		max-height: 50vh;
		width: 100%;
		overflow-y: scroll;
		flex-direction: column;
		background-color: #ffffff;
		z-index: 101;
		&__item {
			align-items: center;
			color: white;
			text-align: left;
			padding: 5px;
			a {
				display: block;
			}
		}
	}
}
.search-block__results__item:hover {
	background-color: lightgrey;
}
.focused {
	background-color: lightgrey;
}
</style>