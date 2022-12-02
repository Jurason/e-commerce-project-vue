<template>
	<div class="item__container">
		<img :src="item.images['0']" alt="img">
		<div class="search-block__results__item__description">{{ item.title }}</div>
	</div>
</template>

<script>
export default {
	name: "DropdownItem",
	props: {
		item: {type: Object, required: true}
	}
}
</script>

<style scoped>
img {
	width: 40px;
	max-width: 100%;
	max-height: 100%;
}
.item__container {
	display: flex;
	align-items: center;
	gap: 10px;
	height: 40px;
	padding: 5px;
}

</style>