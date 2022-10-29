<template>
  <div class="product-list">
		<ProductCard
      @product-view="productView($event)"
      @quick-buy="productQuickBuy($event)"
      v-for="product of productList"
      :key="product.id"
      :product="product"
    />
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
import ProductCard from "../components/ProductCard.vue";
import ViewProductCard from "../components/ViewProductCard";
import CheckoutCard from "../components/CheckoutCard";
import ConfirmationModal from "../components/ConfirmationModal";

export default {
  name: "HomeView",
  components: {
    ProductCard,
    ViewProductCard,
    CheckoutCard,
    ConfirmationModal,
  },
  data() {
    return {
      currentProductForView: null,
      active: {
        productViewer: false,
        quickBuy: false,
        confirmationModal: false,
      },
    };
  },
  computed: {
		productList(){
			return this.$root.$data.getProducts()
		}
	},
  methods: {
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
.product-list {
  display: flex;
  max-width: 80%;
  margin: auto;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}
</style>
