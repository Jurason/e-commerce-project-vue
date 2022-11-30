<template>
	<HomeView :searchQuery="searchQuery"/>
</template>

<script>
import HomeView from "./HomeView";
export default {
	name: "SearchResultsView",
	components: {
		HomeView
	},
	computed: {
		searchQuery(){
			return this.$route.params.query.toString()
		}
	}
}
</script>

<style scoped>

</style>