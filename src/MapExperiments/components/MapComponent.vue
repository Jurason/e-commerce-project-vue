//what this component do?
// - display the map view at the specified coordinates

<template>
	<div id="map"></div>
</template>

<script>
import leaflet from "leaflet";

export default {
	name: "MapComponent",
	props: {
		coordinatesToDisplay: {type: Object, required: true}
	},
	map: null,
	mounted(){
		const { latitude:lat, longitude:lng, zoom } = this.coordinatesToDisplay

		this.$options.map = leaflet.map('map').setView([lat, lng], zoom);
		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(this.$options.map);

		this.markersList = JSON.parse(localStorage.getItem('marker-list')) || []
		this.markersList?.forEach(marker => leaflet.marker([marker.latitude, marker.longitude]).addTo(this.$options.map))
	},
	data(){
		return {
			markersList: []
		}
	},
	computed: {
		// isAlreadyAdded(){
		// 	return this.markersList.some(marker => marker.latitude === this.coordinatesToDisplay.lat && marker.longitude === this.coordinatesToDisplay.lng)
		// }
	},
	methods: {
		setView(){
			const { latitude:lat, longitude:lng, zoom } = this.coordinatesToDisplay
			this.$options.map.setView([lat, lng], zoom);
		},
		// addMarker(){
		// 	leaflet.marker([this.coordinatesToDisplay.latitude, this.coordinatesToDisplay.longitude]).addTo(this.$options.map)
		// },
	},
	watch: {
		coordinatesToDisplay(){
			this.setView()
		}
	}
}

</script>

<style scoped>
#map {
	height: 100%;
	width: 100%;
	border-radius: 0 5em 0 5em;
}
</style>