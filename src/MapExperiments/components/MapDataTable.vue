<template>
	<BTable
			hover
			:items="itemsList"
			:fields="fields"
	>
		<template #cell(combine)="data">
			{{ data.item.latitude }} : {{ data.item.longitude }}
		</template>
		<template #head(name)="data">
			<span style="color: blue">{{ data.label.toUpperCase()}}</span>
		</template>
	</BTable>
</template>

<script>
import { BTable } from 'bootstrap-vue-3'

export default {
	name: "MapDataTable",
	components: {
		BTable
	},
	props: {
		itemsList: {type: Array, required: true},
	},
	data(){
		return {
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
	methods: {
		addTablePosition(){
			this.searchInput = this.searchInput[0].toUpperCase() + this.searchInput.slice(1).toLowerCase()
			this.markersList.push({
				name: this.searchInput,
				latitude: this.currentCoords.lat,
				longitude: this.currentCoords.lng,
			})
			localStorage.setItem('marker-list', JSON.stringify(this.markersList))
		},
	},
}
</script>

<style scoped>

</style>