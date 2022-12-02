<template>
	<div class="input-wrapper">
		<input
				placeholder="Enter country name..."
				@focus="isHighlighted = true"
				v-model="searchInput"
				@keydown.enter="searchQuery"
				ref="input" type="text" class="input"
		>
	</div>
	<div class="underline">
		<div class="unfocused-line"></div>
		<div
				:class="{'is-highlighted': isHighlighted}"
				class="focused-line"
		></div>
	</div>
</template>

<script>

export default {
	name: "MapSearchInput",
	data(){
		return {
			searchInput: '',
			isHighlighted: false,
		}
	},
	emits: {
		'searchQuery': String
	},
	mounted(){
		document.addEventListener('click', this.clickHandler)
	},
	beforeUnmount(){
		document.removeEventListener('click', this.clickHandler)
	},
	methods: {
		clickHandler(event){
			if(event.target !== this.$refs.input){
				this.isHighlighted = false
			}
		},
		searchQuery(){
			if(!this.searchInput){
				return
			}
			this.$emit('searchQuery', this.searchInput)
		}
	}
}
</script>

<style scoped>
.input-wrapper {
}
.input {
	width: 100%;
	height: 50px;
	font-size: 22px;
	padding: 10px;
	outline: none;
	border: none;
}
.input::placeholder {
	color: grey;
}
.unfocused-line {
	border-bottom: 1px solid grey;
}
.focused-line {
	position: absolute;
	top: calc(100% - 2px);
	right: 0;
	left: 0;
	width: 0;
	margin: auto;
	transition: all .2s ease;
}
.is-highlighted	{
	border-width: 0 0 2px 0;
	border-style: solid;
	border-color: black;
	width: 100%;
	height: 0;
}

</style>