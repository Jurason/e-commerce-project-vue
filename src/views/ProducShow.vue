<template>
	<section class="produc" v-if="product">
		<div class="product__heading">
			<h1 class="product__title">{{product.title}}</h1>
		</div>
		<div class="product__navbar">
			<ul class="tabs__list">
				<li class="tabs__item" :class="{'active': currentTab === 'overview'}" @click="activeTab($event.target.textContent.toLowerCase())">
					<router-link class="tab__link" :to="{name: 'productCard.info', params: {tabName: 'overview'}}">Overview</router-link>
				</li>
				<li class="tabs__item" :class="{'active': currentTab === 'details'}" @click="activeTab($event.target.textContent.toLowerCase())">
					<router-link class="tab__link" :to="{name: 'productCard.info', params: {tabName: 'details'}}">Details</router-link>
				</li>
				<li class="tabs__item" :class="{'active': currentTab === 'reviews'}" @click="activeTab($event.target.textContent.toLowerCase())">
					<router-link class="tab__link" :to="{name: 'productCard.info', params: {tabName: 'reviews'}}">Reviews</router-link>
				</li>
			</ul>
		</div>
		<div class="product__main">
			<keep-alive>
				<component :product="product" :is="currentTabComponent"/>
			</keep-alive>
		</div>
	</section>
	<div class="product__related">
		<h2 class="product__related__header">Related products</h2>
		<RelatedProductsSlider :productList="$root.$data.store"/>
	</div>
</template>

<script>
import ProductOverviewComponent from "../components/ProductShow/ProductOverviewComponent";
import ProductDetailsComponent from "../components/ProductShow/ProductDetailsComponent";
import ProductReviewsComponent from "../components/ProductShow/ProductReviewsComponent";
import RelatedProductsSlider from "../components/ProductShow/RelatedProductsSlider";
export default {
	name: "ProductCardShow",
	components: {
		RelatedProductsSlider
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
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0;
	}
	.produc {
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
		color: black;
	}
	.product__main {
		display: flex;
		max-width: 100%;
		height: 60vh;
	}
	.product__related {
		position: relative;
		margin: auto;
		max-width: 80%;
	}
	.product__related__header {
		text-align: center;
	}
	.product__related__slider {
		min-height: 200px;
	}
</style>