<template>
	<BTable
			hover
			:items="itemsList"
			:fields="fields"
	>
		<template #head(name)="data">
			<span style="color: blue">{{ data.label.toUpperCase()}}</span>
		</template>
		<template #cell(delete)="data">
			<button @click="$emit('remove-item', data.item)">X</button>
		</template>
		<template #cell(show)="data">
			<button @click="$emit('show-item', data.item)">show</button>
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
	emits: {
		'remove-item': item => typeof item === 'object',
		'show-item': item => typeof item === 'object',
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
					key: 'show',
					label: 'show',
				},
				{
					key: 'delete',
					label: '',
				}
			]
		}
	},
	computed: {
		itemsListLength(){
			return this.itemsList.length
		}
	},
	methods: {
		handleTableData(){
			this.itemsList.forEach(item => {
				item['name'] = item['name'].split(' ').map(word => {
					return word[0].toUpperCase() + word.slice(1).toLowerCase()
				}).join(' ')
			})
		},
	},
	watch: {
		itemsListLength(){
			this.handleTableData()
			localStorage.setItem('marker-list', JSON.stringify(this.itemsList))
		}
	}
}
</script>

<style scoped>

</style>