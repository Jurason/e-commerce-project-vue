<template>
  <h1>Checkout page</h1>
  <div class="checkout">
    <div class="items-list">
      <ProductInCart
        @change-quantity="changeQuantity($event)"
        v-for="product of getCartProducts"
        :product="product"
        :key="product.id"
      />
    </div>
    <CheckoutCard @checkout="active.confirmationModal = true" />
    <ConfirmationModal
      :isOpen="active.confirmationModal"
      @close="active.confirmationModal = false"
      @confirm="orderConfirmed($event)"
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
  mounted() {},
  data() {
    return {
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
      this.updateProductQuantityInCart(e.product, e.newValue);
    },
    orderConfirmed(e) {
      console.log("Order Confirmed from Checkout View!");
      this.active.confirmationModal = false;
      this.removeOrderedItemsFromStore();
      if (!e.saveCartState) {
        this.emptyCart();
      }
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
