<template>
  <div class="checkout-container">
    <div class="checkout-container__header">
      <p class="checkout-container__header__title">ORDER SUMMARY</p>
    </div>
		<hr class="checkout-container__line">
    <div class="checkout-container__content">
      <div class="checkout-container__content__subtotal"><b>Subtotal:</b> ${{ getSubTotal.toFixed(2) }}</div>
      <div class="checkout-container__content__shipping"><b>Shipping:</b> {{ $options.SHIPPING_FEE }}</div>
      <div class="checkout-container__content__total"><b>Total:</b> ${{ getTotal.toFixed(2) }}</div>
    </div>
    <div class="checkout-container__content__footer">
			<BaseButton
					:disabled="isCartEmpty"
					name="Checkout"
					@click="checkout"
			/>
    </div>
  </div>
</template>

<script>
import { SHIPPING_FEE } from "../App";
import BaseButton from "./BaseButton";

export default {
	components: {
		BaseButton
	},
	SHIPPING_FEE: SHIPPING_FEE,
  name: "CheckoutBoard",
  emits: { checkout: null },
	computed: {
		getTotal(){
			return this.$root.$data.cartTotal().total
		},
		getSubTotal(){
			return this.$root.$data.cartTotal().subTotal
		},
		isCartEmpty(){
			return !this.$root.$data.cart.length
		}
	},
	methods: {
		checkout(){
			if(this.isCartEmpty){
				return
			}
			this.$emit('checkout', null)
		}
	}
};
</script>
<style lang="scss">
.checkout-container {
	height: 250px;
	width: 200px;
	display: flex;
  flex-direction: column;
	align-items: center;
	justify-content: space-between;
  border-radius: 1em;
  padding: 20px;
  box-shadow: 0 0 5px grey;
	background-color: rgb(79, 160, 187);
}
.checkout-container__line{
	width: 100%;
	border: 1px solid rgb(16, 39, 47);
	background-color: rgb(16, 39, 47);
}
.checkout-container__header {
	font-weight: bold;
}
.checkout-container__content {
	height: 100%;
	margin: 10% auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: baseline;
}
.checkout-container__content__footer {
  width: 90%;
  .button-base {
    background-color: rgb(16, 39, 47);
		width: 100%;
		color: rgb(79, 160, 187);
		box-shadow: 0 0 5px #fff;
  }
	.button-base__disabled {
		box-shadow: none;
	}
}
@media screen and (max-width: 880px) {
	.checkout-container {
		margin-left: auto;
	}
}
</style>
