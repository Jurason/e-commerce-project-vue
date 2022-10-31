<template>
  <div class="total">
    <div class="header">
      <p class="title">ORDER SUMMARY</p>
    </div>
    <div class="body">
      <p class="text-box">Subtotal: ${{ getSubTotal.toFixed(2) }}</p>
      <p class="text-box">Shipping: {{ $options.SHIPPING_FEE }}</p>
      <p class="text-total">Total ${{ getTotal.toFixed(2) }}</p>
    </div>
    <div class="footer">
      <div :class="{'disabled-button' : isCartEmpty}" @click="checkout" class="checkout-button">
        Checkout
      </div>
    </div>
  </div>
</template>

<script>
import { SHIPPING_FEE } from "../App";

export default {
	SHIPPING_FEE: SHIPPING_FEE,
  name: "CheckoutCard",
  emits: { checkout: null },
	computed: {
		getTotal(){
			return this.$root.$data.getCartTotal().total
		},
		getSubTotal(){
			return this.$root.$data.getCartTotal().subTotal
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
* {
  box-sizing: border-box;
}
.total {
  width: 30%;
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: rgb(79, 160, 187);
  border-radius: 1em;
  align-items: center;
  padding: 10px;
  box-shadow: 0 0 5px grey;
  margin-left: auto;
}
.footer {
  width: 90%;
  .checkout-button {
    background-color: rgb(150, 196, 211);
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    width: 100%;
    border: 1px solid black;
  }
	.disabled-button{
		background-color: rgb(159, 62, 62);
	}
}

</style>
