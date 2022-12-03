//	what this component do?
// - display the map view at the specified coordinates

<template>
	<div id="map"></div>
</template>

<script>
import leaflet from "leaflet";

export default {
	name: "MapComponent",
	props: {
		coordinatesToDisplay: {type: Object, required: true},
		markersList: {type: Object, required: false},
		markerToRemove: {type: Object, required: false},
	},
	map: null,
	mounted(){
		const { latitude:lat, longitude:lng, zoom } = this.coordinatesToDisplay

		this.$options.map = leaflet.map('map').setView([lat, lng], zoom);
		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(this.$options.map);

		this.markersList?.forEach(this.addMarker)
	},
	methods: {
		setView(){
			const { latitude:lat, longitude:lng, zoom } = this.coordinatesToDisplay
			this.$options.map.setView([lat, lng], zoom);
		},
		addMarker(marker){
			leaflet.marker([marker.latitude, marker.longitude]).addTo(this.$options.map)
		},
		removeMarker(marker){
			console.log('remove marker')
			this.$options.map.removeLayer(marker)
		}
	},
	watch: {
		coordinatesToDisplay(newValue){
			this.setView()
			this.addMarker(newValue)
			// console.log('this.markersList:', this.markersList)

		},
		markerToRemove(newValue){
			this.removeMarker([newValue.latitude, newValue.longitude])
			console.log('newValue:', newValue)
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