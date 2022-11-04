<template>
	<section class="product" v-if="product">
		<div class="product__heading">
			<h1 class="product__title">{{product.title}}</h1>
		</div>
		<div class="product__navbar">
			<ul class="tabs__list">
				<li class="tabs__item" :class="{'active': currentTab === 'Overview'}" @click="currentTab = $event.target.textContent">
					<router-link class="tab__link" :to="{name: 'productCard.info', params: {tabName: 'overview'}}">Overview</router-link>
				</li>
				<li class="tabs__item" :class="{'active': currentTab === 'Details'}" @click="currentTab = $event.target.textContent">
					<router-link class="tab__link" :to="{name: 'productCard.info', params: {tabName: 'details'}}">Details</router-link>
				</li>
				<li class="tabs__item" :class="{'active': currentTab === 'Reviews'}" @click="currentTab = $event.target.textContent">
					<router-link class="tab__link" :to="{name: 'productCard.info', params: {tabName: 'reviews'}}">Reviews</router-link>
				</li>
			</ul>
		</div>
		<div class="product__main">
			<keep-alive>
				<component :is="currentTabComponent"/>
			</keep-alive>
		</div>
		<div class="product__related">
			<h2 class="product__related__header">Related products</h2>
			<div class="product__related__slider">Slider</div>
		</div>
	</section>
</template>

<script>
import ProductOverviewComponent from "../components/ProductCardShow/ProductOverviewComponent";
import ProductDetailsComponent from "../components/ProductCardShow/ProductDetailsComponent";
import ProductReviewsComponent from "../components/ProductCardShow/ProductReviewsComponent";
export default {
	name: "ProductCardShow",
	props: {
		productName: {type: String, required: true}
	},
	mounted(){
		this.product = this.$root.$data.store.find(item => item.title === this.productName)
	},
	data(){
		return {
			product: null,
			currentTab: 'Overview'
		}
	},
	computed: {
		currentTabComponent(){
			switch (this.currentTab) {
				case 'Overview':
					return ProductOverviewComponent
				case 'Details':
					return ProductDetailsComponent
				case 'Reviews':
					return ProductReviewsComponent
				default:
					return ProductOverviewComponent
			}
		},
	},
	methods: {
	}
}
</script>

<style scoped>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0;
	}
	.product__navbar {
		background-color: #d3dff2;
	}
	.tabs__list {
		display: flex;
		max-width: 1280px;
		overflow: auto;
		list-style: none;
	}
	.active {
		box-shadow: inset 0 -2px 0 0 #00a046;
		color: #00a046;
	}
	.tab__link {
		text-decoration: none;
		font-size: 14px;
		line-height: 40px;
		padding-left: 8px;
		padding-right: 8px;
		white-space: nowrap;
	}
	.product__main {
		max-width: 100%;
		min-height: 200px;
		border: 1px dotted blue;
	}

	.product__related__header {
		text-align: left;
	}
	.product__related__slider {
		min-height: 200px;
	}
</style>