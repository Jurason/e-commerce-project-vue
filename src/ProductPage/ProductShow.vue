<template>
	<section class="product-overview" v-if="product">
		<div class="product-overview__header">
			<h1 class="product-overview__header__title">{{product.title}}</h1>
		</div>
		<div class="product-overview__navbar">
			<ul class="product-overview__navbar__tabs__list tabs__list">
				<li class="tabs__list__item item" :class="{'active-tab': currentTab === 'overview'}" @click="activeTab($event.target.textContent.toLowerCase())">
					<router-link class="item__link" :to="{name: 'productCard.info', params: {tabName: 'overview'}}">Overview</router-link>
				</li>
				<li class="tabs__list__item" :class="{'active-tab': currentTab === 'details'}" @click="activeTab($event.target.textContent.toLowerCase())">
					<router-link class="item__link" :to="{name: 'productCard.info', params: {tabName: 'details'}}">Details</router-link>
				</li>
				<li class="tabs__list__item" :class="{'active-tab': currentTab === 'reviews'}" @click="activeTab($event.target.textContent.toLowerCase())">
					<router-link class="item__link" :to="{name: 'productCard.info', params: {tabName: 'reviews'}}">Reviews</router-link>
				</li>
			</ul>
		</div>
		<div class="product-overview__main">
			<keep-alive>
				<component :product="product" :is="currentTabComponent"/>
			</keep-alive>
		</div>
	</section>
	<div class="product-related">
		<h2 class="product-related__header">Related products</h2>
		<RelatedProductsSlider :productList="$root.$data.store"/>
	</div>
</template>

<script>
import ProductOverviewComponent from "./ProductOverview/ProductOverviewComponent";
import ProductDetailsComponent from "./components/ProductDetailsComponent";
import ProductReviewsComponent from "./components/ProductReviewsComponent";
import RelatedProductsSlider from "./components/SliderRelatedProducts";
export default {
	name: "ProductShow",
	components: {
		RelatedProductsSlider,
	},
	props: {
		productName: {type: String, required: true}
	},
	mounted(){
		this.initComponent()
	},
	data(){
		return {
			product: null,
			currentTab: 'overview',
		}
	},
	computed: {
		currentTabComponent(){
			switch (this.currentTab) {
				case 'overview':
					return ProductOverviewComponent
				case 'details':
					return ProductDetailsComponent
				case 'reviews':
					return ProductReviewsComponent
				default:
					return ProductOverviewComponent
			}
		},
	},
	methods: {
		initComponent(){
			this.product = this.$root.$data.store.find(item => item.title === this.productName)
		},
		activeTab(tabName){
			this.currentTab = tabName
		},
	},
	watch: {
		productName(){
			this.initComponent()
			this.currentTab = 'overview'
		}
	}
}
</script>

<style scoped>

	.product-overview__navbar {
		background-color: #d3dff2;
	}
	.product-overview__navbar__tabs__list {
		display: flex;
		max-width: 1280px;
		overflow: auto;
		list-style: none;
	}
	.active-tab {
		box-shadow: inset 0 -2px 0 0 #00a046;
		color: #00a046;
	}
	.item__link {
		text-decoration: none;
		font-size: 14px;
		line-height: 40px;
		padding-left: 8px;
		padding-right: 8px;
		white-space: nowrap;
		color: black;
	}
	.product-overview__main {
		display: flex;
		max-width: 100%;
		height: 60vh;
		padding: 0 24px;
	}
	.product-related {
		position: relative;
		margin: 30px auto;
		max-width: 80%;
	}
	.product-related__header {
		text-align: center;
		margin-bottom: 10px;
	}
</style>