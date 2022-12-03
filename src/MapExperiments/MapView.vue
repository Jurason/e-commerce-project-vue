<template>
	<div class="map-comp-container">
		<div class="search-container">
			<MapSearchInput @searchQuery="searchQueryHandler($event)"/>
		</div>
		<div class="map-container">
			<MapComponent
			:coordinatesToDisplay="coordinatesToDisplay"
			:markersList="dataToDisplay"
			:markerToRemove="markerToRemove"
			/>
			<div class="marker-table">
				<MapDataTable
				:itemsList="dataToDisplay"
				@remove-item="removeItem($event)"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import MapComponent from "./components/MapComponent";
import MapSearchInput from "./components/MapSearchInput";
import MapDataTable from "./components/MapDataTable";
import { getCoords } from "./api";
export const INITIAL_COORDS = {
	latitude: 46.44,
	longitude: 30.71,
	zoom: 6
}
export default {
	name: "MapView",
	components: {
		MapDataTable,
		MapComponent,
		MapSearchInput
	},
	mounted(){
		if(localStorage.getItem('marker-list')){
			this.dataToDisplay = JSON.parse(localStorage.getItem('marker-list'))
		}
	},
	data(){
		return {
			dataToDisplay: [],
			coordinatesToDisplay: {
				latitude: INITIAL_COORDS.latitude,
				longitude: INITIAL_COORDS.longitude,
				zoom: INITIAL_COORDS.zoom
			},
			markerToRemove: null
		}
	},
	methods: {
		removeItem(item){
			this.markerToRemove = item
			this.dataToDisplay = this.dataToDisplay.filter(item => item['name'] !== item['name'])
		},
		async searchQueryHandler(query){
			const responseData = await getCoords(query)
			if(responseData){
				this.coordinatesToDisplay = responseData
				// already added to table ?
				if(this.dataToDisplay.some(item => item['name'].toLowerCase() === responseData['name'])){
					return
				}
				this.dataToDisplay.push(responseData)
			}
		},
	},
}
</script>

<style scoped>

.map-comp-container {
	display: flex;
	flex-direction: column;
	height: 90vh;
}
.search-container {
	margin: 30px auto;
	width: 60%;
	position: relative;
}

	.map-container {
		display: flex;
		height: 100%;
		width: 90vw;
		margin: 0 auto 30px auto;
		justify-content: space-between;
	}
	.marker-table {
		width: 100%;
	}
</style>