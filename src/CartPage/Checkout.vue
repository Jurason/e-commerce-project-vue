<template>
  <div class="cart">
    <div class="cart__cart-list cart-list">
			<CartList :cartProducts="getCartProducts">
				<template v-slot:product="slotProp">
					<CartProduct
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
import CartProduct from "./components/CartProduct";
import CartList from "./components/CartList";
import CheckoutCard from "../components/CheckoutBoard";
import ConfirmationModal from "../components/ConfirmationModal";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Checkout-page",
  components: {
    CartProduct,
    CheckoutCard,
    ConfirmationModal,
		CartList
  },
  data() {
    return {
      active: {
        confirmationModal: false,
      },
    };
  },
	computed: {
		...mapGetters(['getCartProducts']),
	},
  methods: {
		...mapMutations(['REMOVE_ORDERED_FROM_STORE', 'EMPTY_CART']),
    orderConfirmed(saveCartState) {
      console.log("Order Confirmed from Checkout View!");
      this.active.confirmationModal = false;
      this.REMOVE_ORDERED_FROM_STORE();
      if (!saveCartState) {
        this.EMPTY_CART();
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
