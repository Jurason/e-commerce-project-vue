<template>
  <div class="checkout">
    <div class="items-list">
			<CartList>
				<template v-slot:product="slotProp">
					<ProductInCart
							:product="slotProp.product"
					/>
				</template>
			</CartList>
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
import CartList from "../components/CartList";

export default {
  name: "Checkout-page",
  components: {
    ProductInCart,
    CheckoutCard,
    ConfirmationModal,
		CartList
  },
  mounted() {},
  data() {
    return {
      active: {
        confirmationModal: false,
      },
    };
  },
  methods: {
    orderConfirmed(e) {
      console.log("Order Confirmed from Checkout View!");
      this.active.confirmationModal = false;
      this.$root.$data.removeOrderedItemsFromStore();
      if (!e.saveCartState) {
        this.$root.$data.emptyCart();
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
