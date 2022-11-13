<template>
  <div class="cart">
    <div class="cart__cart-list cart-list">
			<CartList :cartProducts="$root.$data.cart">
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
import ProductInCart from "../components/CartProduct";
import CheckoutCard from "../components/CheckoutBoard";
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
.cart {
	width: 60%;
	margin: auto;
	display: grid;
	grid-template-columns: 3fr 1fr;
  gap: 20px;
}
.cart__cart-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.cart__checkout-board {

}
@media screen and (max-width: 1200px) {
	.cart {
		width: 80%;
	}
}
@media screen and (max-width: 880px) {
	.cart{
		grid-template-columns: 1fr;
	}
}
</style>
