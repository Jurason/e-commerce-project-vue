<template>
	<transition name="no-result">
		<div class="no-results">No results</div>
	</transition>
</template>

<script>
export default {
	name: "NoResults"
}
</script>

<style scoped>
.no-result-enter-from, .no-result-leave-to {
	opacity: 0;
}
.no-result-enter-to {
	opacity: 1;
}
.no-result-enter-active, .no-result-leave-active {
	transition: all .4s;
}

.no-results {
	margin-top: 20%;
	font-size: 26px;
	color: green;
}

</style>