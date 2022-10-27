<template>
  <h1>Checkout page</h1>
  <div class="checkout">
    <div class="items-list">
      <ProductInCart
        @change-quantity="changeQuantity($event)"
        v-for="product of productsInCart"
        :product="product"
        :key="product.id"
      />
    </div>
    <CheckoutCard @checkout="active.confirmationModal = true" />
    <ConfirmationModal
      :isOpen="active.confirmationModal"
      @close="active.confirmationModal = false"
      @confirm="orderConfirmed"
    />
  </div>
</template>
<script>
import ProductInCart from "../components/ProductInCart";
import CheckoutCard from "../components/CheckoutCard";
import ConfirmationModal from "../components/ConfirmationModal";
import { getters, mutations } from "../assets/my-store/index";

export default {
  name: "Checkout-page",
  components: {
    ProductInCart,
    CheckoutCard,
    ConfirmationModal,
  },
  mounted() {
    this.productsInCart = this.getCartProducts;
  },
  updated() {
    this.productsInCart = this.getCartProducts;
  },
  data() {
    return {
      productsInCart: [],
      active: {
        confirmationModal: false,
      },
    };
  },
  computed: {
    ...getters,
  },
  methods: {
    ...mutations,
    changeQuantity(e) {
      console.log("Input Changed!");
      console.log("e:", e);
      this.updateProductQuantityInCart(e.productId, e.newValue);
      console.log("this.getCartProducts:", this.getCartProducts);
    },
    orderConfirmed() {
      console.log("Order Confirmed from Checkout View!");
      this.active.confirmationModal = false;
      this.removeOrderedItemsFromStore();
      this.emptyCart();
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
.checkout {
  display: flex;
  width: 80vw;
  margin: auto;
  gap: 20px;
}
.items-list {
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 15px;
}
</style>
