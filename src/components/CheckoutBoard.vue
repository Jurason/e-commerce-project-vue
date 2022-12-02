<template>
  <div class="checkout-container">
    <div class="checkout-container__header">
      <p class="checkout-container__header__title">ORDER SUMMARY</p>
			<hr class="checkout-container__line">
    </div>
    <div class="checkout-container__content">
      <div class="checkout-container__content__subtotal"><b>Subtotal:</b> ${{ getSubTotal.toFixed(2) }}</div>
      <div class="checkout-container__content__shipping"><b>Shipping:</b> {{ getShippingFee }}</div>
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
import BaseButton from "./BaseButton";
import { mapGetters } from "vuex";

export default {
	components: {
		BaseButton
	},
  name: "CheckoutBoard",
  emits: { checkout: null },
	computed: {
		...mapGetters({
			getCartProducts: 'getCartProducts',
			getCartTotal: 'getCartTotal',
			getShippingFee: 'getShippingFee'
		}),
		getTotal(){
			return this.getCartTotal.total
		},
		getSubTotal(){
			return this.getCartTotal.subTotal
		},
		isCartEmpty(){
			return !this.getCartProducts.length
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
	display: grid;
  grid-template-rows: 1fr 3fr 1fr;
	align-items: center;
  border-radius: 1em;
  padding: 20px;
  box-shadow: 0 0 5px grey;
	background-color: rgb(235, 229, 227);
}
.checkout-container__line{
	width: 100%;
	margin: 0;
	border: 1px solid rgb(16, 39, 47);
	background-color: rgb(16, 39, 47);
}
.checkout-container__header {
	font-weight: bold;
}
.checkout-container__content {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: baseline;
}
.checkout-container__content__footer {
  width: 100%;
  .button-base {
    background-color: #ADADADC7;
		width: 100%;
		color: black;
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
