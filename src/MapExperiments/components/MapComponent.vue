//	what this component do?
// - display the map view at the specified coordinates
// - add markers
// - remove markers

<template>
	<div id="map"></div>
</template>

<script>
import leaflet from "leaflet";
export const INITIAL_COORDS = {
	latitude: 46.44,
	longitude: 30.71,
	zoom: 6
}

export default {
	name: "MapComponent",
	props: {
		coordinatesToDisplay: {type: Object, required: false},
		markerToRemove: {type: Object, required: false},
		markerToAdd: {type: Object, required: false},
	},
	emits: {
		'add-to-table': data => typeof data === 'object'
	},
	data(){
		return {
			map: null,
			markersGroup: null,
			initialView: {
				latitude: INITIAL_COORDS.latitude,
				longitude: INITIAL_COORDS.longitude,
				zoom: INITIAL_COORDS.zoom
			},
		}
	},
	mounted(){
		const { latitude:lat, longitude:lng, zoom } = this.initialView
		this.map = leaflet.map('map').setView([lat, lng], zoom);
		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(this.map);
		this.markersGroup = leaflet.layerGroup().addTo(this.map)

		if(localStorage.getItem('marker-list')){
			const markersListFromStorage = JSON.parse(localStorage.getItem('marker-list'))
			markersListFromStorage.forEach(this.addMarker)
		}
	},
	methods: {
		setView(coordinates){
			const { latitude:lat, longitude:lng, zoom } = coordinates
			this.map.setView([lat, lng], zoom);
		},
		addMarker(marker){
			const layer = leaflet.marker([marker.latitude, marker.longitude])
			this.markersGroup.addLayer(layer)
			this.handleMarkerData(marker, layer)
		},
		handleMarkerData(marker, layer){
			Object.assign(marker, {id: layer._leaflet_id})
			this.$emit('add-to-table', marker)
		},
		removeMarker(marker){
			if(!this.markersGroup.hasLayer(marker.id)){
				return
			}
			this.markersGroup.removeLayer(marker.id)
		}
	},
	watch: {
		coordinatesToDisplay(newValue){
			this.setView(newValue)
		},
		markerToRemove(newValue){
			this.removeMarker(newValue)
		},
		markerToAdd(newValue){
			this.addMarker(newValue)
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