<template>
	<CarouselComponent :slides="productImages"/>
	<div class="product__main__info">
		<div class="product__main__info__status product-status">
			Balance {{ productQuantity }} it.
		</div>
		<div class="product__main__info__about about-component">
			<div class="about-component__price">
				{{ productPrice }} $
			</div>
			<BaseButton
					:disabled="false"
					name="Buy"
					@click="active.productViewer = true"
			/>
		</div>
		<div class="product__main__info__seller">
			"About seller" component
		</div>
		<div class="product__main__info__delivery">
			"About delivery" component
		</div>
	</div>
	<ProductPopup
			:isOpen="active.productViewer"
			:product="this.product"
			@close="active.productViewer = false"
	/>
</template>

<script>
import CarouselComponent from './components/Carousel'
import BaseButton from "../../components/BaseButton";
import ProductPopup from "../../components/ProductPopup";

export default {
	name: "ProductOverviewComponent",
	props: {
		product: {type: Object, required: true}
	},
	components: {
		CarouselComponent,
		BaseButton,
		ProductPopup
	},
	data(){
		return {
			active: {
				productViewer: false,
			},
		}
	},
	computed: {
		productImages(){
			return this.$root.$data.getProductFromStore(this.product).images
		},
		productQuantity(){
			return this.$root.$data.getProductFromStore(this.product).stock
		},
		productPrice(){
			const price = this.$root.$data.getProductFromStore(this.product).price
			return price.toFixed(2)
		}
	}
}
</script>

<style lang="scss" scoped>
	.product__main__info {
		width: 50%;
		height: 100%;
		margin: auto;
		display: grid;
		grid-template-rows: 1fr 2fr 2fr 2fr;
		padding: 20px;
		gap: 10px;
		&__status {
			display: flex;
			align-items: center;
		}
		&__about {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 20px;
			.about-component__price {
				font-size: 32px;
				color: rgb(79, 160, 187);
			}
			.button-base {
				width: 100px;
				font-size: 32px;
			}
		}
		&__seller {
			display: flex;
			align-items: center;
			border: 1px solid black;
		}
		&__delivery {
			display: flex;
			align-items: center;
			border: 1px solid black;
		}

	}
</style>