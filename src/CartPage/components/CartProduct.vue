<template>
	<div class="cart-product">
		<div v-if="!getMaxQuantity" class="cart-product__disabled"></div>
    <div class="cart-product__left">
			<img :src="product.images['0']" alt="product" />
    </div>
    <div class="cart-product__right">
      <div @click="REMOVE_FROM_CART(product)" class="cart-product__right__close-icon close-icon">X</div>
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
import BaseButton from "../../components/BaseButton";
import {mapGetters, mapMutations} from "vuex";

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
  },
  data() {
    return {
      counter: null,
    };
  },
  computed: {
		...mapGetters(['getProductFromStore']),
		getMaxQuantity() {
			return this.getProductFromStore(this.product)?.stock || 0
		},
    availableQuantity() {
      return this.counter < this.getMaxQuantity;
    },
    moreThenOne() {
      return this.counter > 1;
    },
  },
  methods: {
		...mapMutations(['REMOVE_FROM_CART', 'UPDATE_QUANTITY_IN_CART']),
  },
  watch: {
    counter() {
			this.counter = this.counter < 1 ? 1 : this.counter
			this.counter = this.counter > this.getMaxQuantity ? this.getMaxQuantity : this.counter
			this.UPDATE_QUANTITY_IN_CART({ product: this.product, newQuantity: this.counter })
    },
		getMaxQuantity(){
			this.counter = this.counter > this.getMaxQuantity ? this.getMaxQuantity : this.counter
		}
  },
};
</script>

<style lang="scss">
.cart-product {
	position: relative;
  height: 20vh;
  display: flex;
	box-shadow: 0 0 5px grey;
	padding: 10px;
	border-radius: 15px;
	border: 2px solid yellowgreen;
	background-color: sandybrown;
	overflow: hidden;
}
.cart-product__disabled {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	opacity: .6;
	background-color: lightgrey;
	z-index: 100;
}
.cart-product__left {
  img {
    width: 100%;
		height: 100%;
  }
}
.cart-product__right {
	width: 200%;
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
		z-index: 99;
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
