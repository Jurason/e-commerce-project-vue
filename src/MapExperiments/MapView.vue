<template>
	<div class="map-comp-container">
		<div class="search-container">
			<MapSearchInput @searchQuery="searchQueryHandler($event)"/>
		</div>
		<div class="map-container">
			<MapComponent
			:coordinatesToDisplay="coordinatesToDisplay"
			/>
			<div class="marker-table">
				<MapDataTable
				:itemsList="dataToDisplay"
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
	zoom: 11
}
export default {
	name: "MapView",
	components: {
		MapDataTable,
		MapComponent,
		MapSearchInput
	},
	data(){
		return {
			dataToDisplay: [],
			coordinatesToDisplay: {
				latitude: INITIAL_COORDS.latitude,
				longitude: INITIAL_COORDS.longitude,
				zoom: INITIAL_COORDS.zoom
			}
		}
	},
	methods: {
		async searchQueryHandler(query){
			query = query.toLowerCase()
			const responseData = await getCoords(query)
			if(responseData){
				this.coordinatesToDisplay = responseData
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