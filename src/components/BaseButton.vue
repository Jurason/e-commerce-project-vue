<template>
	<button
			class="button-base"
			:class="{ 'button-base__disabled' : disabled }"
			:disabled="disabled"
	>
		{{ name }}
	</button>
</template>

<script>
export default {
	name: "BaseButton",
	props: {
		name: {type: String, required: true},
		disabled: {type: Boolean, required: true},
	},
}
</script>

<style scoped>
.button-base {
	padding: 10px;
	border-radius: 10px;
	border: none;
	background-color: #ADADADC7;
	color: black;
	font-weight: bold;
	cursor: pointer;
	outline: none;
}

.button-base:hover {
	transform: scale(1.05);
	transition-duration: 0.4s;
	transition-delay: 0.1s;
}
.button-base__disabled {
	cursor: default;
	opacity: .5;
}
.button-base__disabled:hover {
	transform: none;
}
</style>