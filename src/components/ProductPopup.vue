<template>
	<transition name="view-product">
	<div ref="backdrop" class="popup__backdrop" v-if="isOpen">
    <div class="popup__container">
      <div class="popup__content">
        <div class="popup__content__close-icon close-icon" @click="$emit('close', null)">X</div>
        <h2 class="popup__content__title">{{ product.title }}</h2>
        <div class="popup__content__description">{{ product.description }}</div>
        <div class="popup__content__price">Price: ${{ product.price.toFixed(2) }}</div>
        <div class="popup__content__footer">
					<BaseButton
							:disabled="!isAvailableQuantity"
							name="Add to cart"
							@click="addToCart"
					/>
          <input
            v-model="quantityInput"
            class="popup__content__footer__quantity-input"
            type="text"
            placeholder="Enter quantity"
						ref="input"
          />
          <div class="popup__content__footer__quantity">
            stock balance {{ maxQuantityForCurrentProduct }}
          </div>
        </div>
      </div>
    </div>
		<div class="popup__content__checkout-block checkout-block">
			<slot name="checkout"></slot>
		</div>
  </div>
	</transition>
</template>

<script>
import BaseButton from "./BaseButton";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ProductPopup",
	components: {
		BaseButton
	},
  data() {
    return {
      quantityInput: null,
      maxQuantityForCurrentProduct: null,
    };
  },
  props: {
    product: Object,
    isOpen: Boolean,
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("click", this.handleClick);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
		document.removeEventListener("click", this.handleClick);
  },
  computed: {
		...mapGetters({
			getProductFromCart: 'getProductFromCart'
		}),
    isAvailableQuantity() {
      return (
        this.maxQuantityForCurrentProduct >= this.quantityInput && this.maxQuantityForCurrentProduct
      );
    },
		getProductQuantityInCart() {
			return this.getProductFromCart(this.product)?.stock || 0
		}
  },
  methods: {
		...mapMutations(['ADD_PRODUCT_TO_CART']),
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.$emit("close");
      }
      if (this.quantityInput && e.key === "Enter") {
        this.updateCartState();
        this.$emit("close");
      }
    },
		handleClick(e){
			if(this.isOpen && e.target === this.$refs.backdrop){
				this.$emit("close");
			}
		},
    addToCart() {
			if(!this.quantityInput){
				return
			}
      this.updateCartState();
      this.quantityInput = null;
    },
    updateCartState() {
      if (!this.quantityInput) {
        return;
      }
			this.ADD_PRODUCT_TO_CART({product: this.product, quantity: this.quantityInput})
    },
    updateCurrentQuantity() {
			this.maxQuantityForCurrentProduct = this.product.stock - this.getProductQuantityInCart;
    },
  },
  watch: {
    async isOpen() {
      this.quantityInput = null;
      this.updateCurrentQuantity();
    },
    quantityInput() {
      this.updateCurrentQuantity();
    },
  },
};
</script>

<style lang="scss">

//******	transition css	******//
.view-product-enter-active, .view-product-leave-active {
	transition: opacity .4s;
}
.view-product-enter-from, .view-product-leave-to {
	opacity: 0;
}
//******	transition css	******//

.popup__backdrop {
  height: 100vh;
  width: 100%;
  background-color: rgba(124, 124, 124, 0.55);
  z-index: 100;
  position: fixed;
  top: 0;
	left: 0;
	display: flex;
	gap: 20px;
}
.popup__container {
	width: 500px;
	height: 250px;
	margin-left: calc(50% - 250px);
	margin-top: 15%;
}
.popup__content {
	position: relative;
	width: 100%;
	height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
	justify-content: space-between;
  gap: 10px;
  background-color: whitesmoke;
  border-radius: 1em;
  .popup__content__close-icon {
    padding: 20px;
  }
  .popup__content__title {
    padding: 0;
    margin: 0 auto;
  }
  .popup__content__close-icon:hover {
    opacity: 0.5;
  }
	.popup__content__footer {
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		.popup__content__footer__quantity-input {
			max-width: 100px;
			padding: 5px;
			outline: none;
		}
		.popup__content__footer__quantity {
			font-size: 14px;
			color: grey;
		}
	}
}
.popup__content__checkout-block {
	width: 200px;
	margin-top: 15%;
}
</style>
