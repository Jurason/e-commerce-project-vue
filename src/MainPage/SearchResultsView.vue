<template>
	<HomeView :searchResults="$root.$data.searchResults"/>
</template>

<script>
import HomeView from "./HomeView";
export default {
	name: "SearchResultsView",
	components: {
		HomeView
	},
}
</script>

<style scoped>

</style>