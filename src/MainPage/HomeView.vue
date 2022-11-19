<template>
	<div class="wrapper-products-list">
		<div class="filter-block">
			<FilterOptions @filter="filterHandler($event)"/>
		</div>
		<div class="product-list">
			<ProductCardList :products="productList" :filterOptions="filterOptions" >
				<template #product="slotProp">
					<ProductCard
							@product-view="productView($event)"
							@quick-buy="productQuickBuy($event)"
							:product="slotProp.product"
					/>
				</template>
			</ProductCardList>
		</div>
	</div>
  <ProductPopup
    :isOpen="active.productViewer"
    :product="currentProductForView"
    @close="active.productViewer = false"
  />
  <ProductPopup
    :isOpen="active.quickBuy"
    :product="currentProductForView"
    @close="active.quickBuy = false"
  >
    <template v-slot:checkout>
      <CheckoutBoard @checkout="active.confirmationModal = true" />
    </template>
  </ProductPopup>
  <ConfirmationModal
    :isOpen="active.confirmationModal"
    @close="active.confirmationModal = false"
    @confirm="orderConfirmed($event)"
  />
</template>

<script>
import ProductCardsList from "./components/ProductCardsList";
import ProductCard from "./components/ProductCard.vue";
import FilterOptions from "./components/FilterOptions";
import ProductPopup from "../components/ProductPopup";
import ConfirmationModal from "../components/ConfirmationModal";
import CheckoutBoard from "../components/CheckoutBoard";

export default {
  name: "HomeView",
  components: {
		ProductCardList: ProductCardsList,
    ProductCard,
		ProductPopup,
    CheckoutBoard,
    ConfirmationModal,
		FilterOptions,
  },
	props: {
		searchResults: {type: Array, required: false}
	},
	mounted(){
		this.productList = this.$root.$data.searchResults || this.$root.$data.store
	},
	data() {
    return {
			productList: [],
			filterOptions: {},
      currentProductForView: null,
      active: {
        productViewer: false,
        quickBuy: false,
        confirmationModal: false,
      },
    };
  },
  computed: {
	},
  methods: {
		filterHandler(filterOptions){
			this.filterOptions = filterOptions
		},
    productView(product) {
      this.currentProductForView = product;
      this.active.productViewer = true;
    },
    productQuickBuy(product) {
      this.currentProductForView = product;
      this.active.quickBuy = true;
    },
    orderConfirmed(e) {
      console.log("Order Confirmed from HomeView!");
      this.active.confirmationModal = false;
      this.active.quickBuy = false;
			this.$root.$data.removeOrderedItemsFromStore();
			if (!e.saveCartState) {
				this.$root.$data.emptyCart();
			}
    },
  },
	watch: {
		searchResults(){
			this.productList = this.searchResults
		}
	}
};
</script>
<style>
.wrapper-products-list{
	max-width: 80%;
	margin: auto;
	display: flex;
}
.product-list {
	width: 100%;
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}
.filter-block {
	display: flex;
	flex-direction: column;
	gap: 10px;
	text-align: left;
}
.outline-red{
	outline-color: red;
}
</style>
