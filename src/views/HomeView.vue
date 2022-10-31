<template>
	<div class="wrapper-products-list">
		<div class="filter-block">
			<FilterOptions @filter="filterHandler($event)"/>
		</div>
		<div class="product-list">
			<ProductCardList :filterOptions="filterOptions">
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
  <ViewProductCard
    :isOpen="active.productViewer"
    :product="currentProductForView"
    @close="active.productViewer = false"
  />
  <ViewProductCard
    :isOpen="active.quickBuy"
    :product="currentProductForView"
    @close="active.quickBuy = false"
  >
    <template v-slot:checkout>
      <CheckoutCard @checkout="active.confirmationModal = true" />
    </template>
  </ViewProductCard>
  <ConfirmationModal
    :isOpen="active.confirmationModal"
    @close="active.confirmationModal = false"
    @confirm="orderConfirmed($event)"
  />
</template>

<script>
import ProductCardsList from "../components/ProductCardsList";
import ProductCard from "../components/ProductCard.vue";
import ViewProductCard from "../components/ViewProductCard";
import CheckoutCard from "../components/CheckoutCard";
import ConfirmationModal from "../components/ConfirmationModal";
import FilterOptions from "../components/FilterOptions";

export default {
  name: "HomeView",
  components: {
		ProductCardList: ProductCardsList,
    ProductCard,
    ViewProductCard,
    CheckoutCard,
    ConfirmationModal,
		FilterOptions
  },
  data() {
    return {
			filterOptions: {},
      currentProductForView: null,
      active: {
        productViewer: false,
        quickBuy: false,
        confirmationModal: false,
      },
    };
  },
  computed: {},
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
