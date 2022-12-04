<template>
	<div class="map-comp-container">
		<BaseButton
				:disabled="isAlreadyAdded || false"
				name="Add marker"
				@click="addMarkerOnMap"
		/>
		<div class="search-container">
			<MapSearchInput
					@searchQuery="searchQueryHandler($event)"
			/>
		</div>
		<div class="map-container">
			<MapComponent
			:coordinatesToDisplay="coordsToDisplay"
			:markerToRemove="markerToRemove"
			:markerToAdd="markerToAdd"
			@add-to-table="addRowToTable($event)"
			/>
			<div class="marker-table">
				<MapDataTable
				:itemsList="tableData"
				@remove-item="removeRow($event)"
				@show-item="this.dataToDisplay = $event"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import MapComponent from "./components/MapComponent";
import MapSearchInput from "./components/MapSearchInput";
import MapDataTable from "./components/MapDataTable";
import BaseButton from "../components/BaseButton";
import { getCoords } from "./api";

export default {
	name: "MapView",
	components: {
		MapDataTable,
		MapComponent,
		MapSearchInput,
		BaseButton
	},
	data(){
		return {
			tableData: [],
			dataToDisplay: null,
			markerToRemove: null,
			markerToAdd: null,
		}
	},
	computed: {
		isAlreadyAdded(){
			if(!this.dataToDisplay){
				return
			}
			return this.tableData.some(row => row['name'] === this.dataToDisplay['name']) || false
		},
		coordsToDisplay(){
			if(!this.dataToDisplay){
				return
			}
			const { latitude, longitude, zoom } = this.dataToDisplay
			return { latitude: latitude, longitude: longitude, zoom: zoom }
		},
	},
	methods: {
		addMarkerOnMap(){
			this.markerToAdd = this.dataToDisplay
		},
		addRowToTable(row){
			this.tableData.push(row)
		},
		removeRow(rowData){
			this.markerToRemove = rowData
			this.tableData = this.tableData.filter(el => el['name'] !== rowData['name'])
		},
		async searchQueryHandler(query){
			const responseData = await getCoords(query)
			if(responseData){
				this.dataToDisplay = responseData
			}
		},
	},
}
</script>

<style scoped lang="scss">

.map-comp-container {
	display: flex;
	flex-direction: column;
	height: 90vh;
	button {
		position: absolute;
		width: 150px;
		height: 50px;
		top: 129px;
		right: 90px;
	}
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