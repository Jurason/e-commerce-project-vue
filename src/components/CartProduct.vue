<template>
	<div class="cart-product">
    <div class="cart-product__left">
			<img :src="product.images['0']" alt="product" />
    </div>
    <div class="cart-product__right">
      <div @click="removeProduct" class="cart-product__right__close-icon close-icon">X</div>
      <div class="cart-product__right__title">{{ product.title }}</div>
      <div class="cart-product__right__description">{{ product.description }}</div>
      <div class="cart-product__right__quantity"><span class="cart-product__right__quantity__text">Quantity:</span>
				<BaseButton
						:disabled="!moreThenOne"
						name="-"
						@click="counter--"
				/>
        <input type="text" v-model="counter" />
				<BaseButton
						:disabled="!availableQuantity"
						name="+"
						@click="counter++"
				/>
      </div>
      <div class="cart-product__right__price">${{ product.price }}</div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";

export default {
  name: "CartProduct",
	components: {
		BaseButton
	},
  props: {
    product: Object,
  },
  mounted() {
    this.counter = this.product.stock;
		this.maxQuantity = this.getMaxQuantity
  },
  data() {
    return {
      counter: null,
      maxQuantity: null,
    };
  },
  computed: {
		getMaxQuantity() {
			return this.$root.$data.getProductFromStore(this.product)?.stock || this.counter
		},
    availableQuantity() {
      return this.counter < this.maxQuantity;
    },
    moreThenOne() {
      return this.counter > 1;
    },
  },
  methods: {
		removeProduct() {
			this.$root.$data.removeProductFromCart(this.product)
		},
  },
  watch: {
    counter() {
			this.counter = this.counter < 1 ? 1 : this.counter
			this.counter = this.counter > this.maxQuantity ? this.maxQuantity : this.counter
			this.$root.$data.updateProductInCart(this.product, this.counter)
    },
  },
};
</script>

<style lang="scss">
.cart-product {
  height: 20vh;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid yellowgreen;
  display: flex;
  background-color: sandybrown;
  box-shadow: 0 0 5px grey;
  padding: 10px;
  border-radius: 15px;
  position: relative;
}
.cart-product__left {
  img {
    width: 100%;
		height: 100%;
  }
}
.cart-product__right {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 20px;
  justify-content: space-between;

  &__title {
    font-weight: bold;
  }
  &__description {
  }
  &__quantity {
		display: flex;
		gap: 2px;
		align-items: center;
    input {
      width: 50px;
      text-align: center;
			height: 100%;
    }
		.button-base {
			padding: 5px 10px;
		}
  }
  &__price {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 10px;
  }
}

@media screen and (max-width: 880px) {
	.cart-product {
		height: fit-content;
	}
	.cart-product__left{
		display: none;
	}
	.cart-product__right {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
	}
	.cart-product__right__description {
		display: none;
	}
	.cart-product__right__price {
		position: relative;
		text-align: right;
	}
	.cart-product__right__quantity {
		height: 80%;
		margin-left: auto;
	}
	.cart-product__right__quantity__text {
		display: none;
	}
}
</style>
