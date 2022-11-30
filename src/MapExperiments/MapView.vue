<template>
	<div class="map-comp-container">
		<div class="creation-box">
		<div class="input-wrapper">
			<input
					placeholder="Enter country name..."
					@focus="isHighlighted = true"
					v-model="searchInput"
					@keydown.enter="getCoords"
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
	</div>
		<div id="map"></div>
	</div>
</template>

<script>
import leaflet from 'leaflet'
import axios from 'axios'
export default {
	name: "MapView",
	data(){
		return {
			searchInput: '',
			isHighlighted: false,
			currentCoords: {
				lat: 46.44,
				lng: 30.71
			}
		}
	},
	map: null,
	mounted(){
		document.addEventListener('click', this.clickHandler)
		// leaflet map
		// this.setView()
		this.$options.map = leaflet.map('map').setView([this.currentCoords.lat, this.currentCoords.lng], 11);
		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(this.$options.map);
	},
	beforeUnmount(){
		document.removeEventListener('click', this.clickHandler)
	},
	computed: {
		handleInput(){
			return this.searchInput.toLowerCase()
		}
	},
	methods: {
		clickHandler(event){
			if(event.target !== this.$refs.input){
				this.isHighlighted = false
			}
		},
		async getCoords(){
			await axios.get(`https://restcountries.com/v3.1/name/${this.handleInput}`)
					.then(res => {
						const [lat, lng] = res.data[0].latlng
						this.currentCoords.lat = lat
						this.currentCoords.lng = lng
					})
					.then(() => this.setView())
					.catch(err => console.log(err.message))
		},
		setView(){
			this.$options.map.setView([this.currentCoords.lat, this.currentCoords.lng], 6);
		}
	}
}
</script>

<style scoped>
#map {
	height: 100%;
	width: 80%;
	margin: auto auto 50px auto;
}
.map-comp-container {
	display: flex;
	flex-direction: column;
	height: 90vh;
	max-height: 90vh;
}
.creation-box {
	margin: 30px auto;
	width: 60%;
	position: relative;
}
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