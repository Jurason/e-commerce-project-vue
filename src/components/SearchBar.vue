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
		<ul v-if="isVisible" class="search-block__results">
			<li @click="searchInput = ''" v-for="product in filteredList" :key="product.id" class="search-block__results__item">
				<router-link style="text-decoration: none; width: 100%; cursor: pointer" :to="{name: 'productCard.show', params: {productName: product.title}}">
				{{ product.title }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	name: "SearchBar",
	props: {
		products: {type: Array, required: false}
	},
	emits: {
		searchResults(payload){
			return Array.isArray(payload)
		}
	},
	mounted(){
		window.addEventListener('keydown', this.keydownHandler)
		window.addEventListener('click', this.clickHandler)
	},
	beforeUnmount(){
		window.removeEventListener('keydown', this.keydownHandler)
		window.removeEventListener('click', this.clickHandler)
	},
	data() {
		return {
			searchInput: '',
			isVisible: true
		}
	},
	computed: {
		filteredList(){
			return this.searchInput
					? this.products.filter(item => item.title.toLowerCase().includes(this.searchInput.toLowerCase()))
					: ''
		},
		filteredListLength(){
			return this.filteredList.length
		},
	},
	methods: {
		keydownHandler(e){
			if(this.filteredListLength && e.key === 'Enter'){
				this.searchConfirm()
				this.isVisible = false
				this.$refs.searchInput.blur()
			}
		},
		clickHandler(){
			this.isVisible = false
		},
		searchConfirm(){
			this.$emit('searchResults', this.filteredList)
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
	margin: 0 100px;
	&__bar {
		&__input {
			position: relative;
			width: 100%;
			height: 30px;
			outline: none;
			z-index: 101;
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
	background-color: grey;
}
</style>