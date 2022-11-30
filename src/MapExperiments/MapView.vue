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
		<div class="map-container">
			<div id="map"></div>
			<div class="marker-table">
				<BTable
						hover
						:sortBy="sortBy"
						:items="markersList"
						:fields="fields"
				>
					<template #cell(combine)="data">
						{{ data.item.latitude }} : {{ data.item.longitude }}
					</template>
					<template #head(name)="data">
						<span style="color: blue">{{ data.label.toUpperCase()}}</span>
					</template>
				</BTable>
				<button style="margin-top: 100px" @click="makeDanger">Make Danger</button>
			</div>
		</div>
	</div>
</template>
<script>
import leaflet from 'leaflet'
import axios from 'axios'
import { BTable } from 'bootstrap-vue-3'
export default {
	name: "MapView",
	components: {
		BTable,
	},
	data(){
		return {
			sortBy: 'name',
			searchInput: '',
			isHighlighted: false,
			currentCoords: {
				lat: 46.44,
				lng: 30.71
			},
			markersList: [],
			fields: [
				{
					key: 'name',
					label: 'Name',
					sortable: true
				},
				{
					key: 'latitude',
					label: 'latitude',
					sortable: true
				},
				{
					key: 'longitude',
					label: 'longitude',
					sortable: true
				},
				{
					key: 'combine',
					label: 'Coordinates',
					sortable: true
				}
			]
		}
	},
	map: null,
	mounted(){
		document.addEventListener('click', this.clickHandler)
		this.$options.map = leaflet.map('map').setView([this.currentCoords.lat, this.currentCoords.lng], 11);
		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(this.$options.map);

		this.markersList = JSON.parse(localStorage.getItem('marker-list')) || []
		this.markersList?.forEach(marker => leaflet.marker([marker.latitude, marker.longitude]).addTo(this.$options.map))
	},
	beforeUnmount(){
		document.removeEventListener('click', this.clickHandler)
	},
	computed: {
		handleInput(){
			return this.searchInput.toLowerCase()
		},
		isAlreadyAdded(){
			return this.markersList.some(marker => marker.latitude === this.currentCoords.lat && marker.longitude === this.currentCoords.lng)
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
					.then(() => {
						this.setView()
						if(this.isAlreadyAdded){
							return
						}
						this.addMarker()
						this.addTablePosition()
					})
					.catch(err => console.log(err.message))
		},
		setView(){
			this.$options.map.setView([this.currentCoords.lat, this.currentCoords.lng], 6);
		},
		addMarker(){
			leaflet.marker([this.currentCoords.lat, this.currentCoords.lng]).addTo(this.$options.map)
		},
		addTablePosition(){
			this.searchInput = this.searchInput[0].toUpperCase() + this.searchInput.slice(1).toLowerCase()
			this.markersList.push({
				name: this.searchInput,
				latitude: this.currentCoords.lat,
				longitude: this.currentCoords.lng,
			})
			localStorage.setItem('marker-list', JSON.stringify(this.markersList))
		},
		makeDanger(){
			this.markersList.forEach(pos => {
				Object.assign(pos, {_rowVariant: 'danger'})
			})
		},
	},
}
</script>

<style scoped>
#map {
	height: 100%;
	width: 100%;
}
.map-comp-container {
	display: flex;
	flex-direction: column;
	height: 90vh;
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
	.map-container {
		display: flex;
		height: 100%;
		width: 90vw;
		margin: 0 auto 30px auto;
		justify-content: space-between;
		border: 1px solid black;
	}
	.marker-table {
		width: 100%;
	}
</style>