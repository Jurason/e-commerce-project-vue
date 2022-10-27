<template>
  <div class="product-list">
    <ProductCard
      @product-view="productView($event)"
      @quick-buy="productQuickBuy($event)"
      v-for="product of products"
      :key="product.id"
      :product="product"
    />
  </div>
  <ViewProductCard
    :is-open="active.productViewer"
    :product="currentProductForView"
    @close="active.productViewer = false"
  />
  <ViewProductCard
    :is-open="active.quickBuy"
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
    @confirm="orderConfirmed"
  />
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import ViewProductCard from "../components/ViewProductCard";
import CheckoutCard from "../components/CheckoutCard";
import ConfirmationModal from "../components/ConfirmationModal";
import { getters, mutations } from "../assets/my-store/index";

export default {
  name: "HomeView",
  components: {
    ProductCard,
    ViewProductCard,
    CheckoutCard,
    ConfirmationModal,
  },
  mounted() {
    this.products = this.getProducts();
  },
  data() {
    return {
      products: [],
      currentProductForView: null,
      active: {
        productViewer: false,
        quickBuy: false,
        confirmationModal: false,
      },
    };
  },
  methods: {
    ...getters,
    ...mutations,
    productView(product) {
      this.currentProductForView = product;
      this.active.productViewer = true;
    },
    productQuickBuy(product) {
      this.currentProductForView = product;
      this.active.quickBuy = true;
    },
    orderConfirmed() {
      console.log("Order Confirmed from HomeView!");
      this.active.confirmationModal = false;
      this.active.quickBuy = false;
      this.removeOrderedItemsFromStore();
      this.emptyCart();
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
