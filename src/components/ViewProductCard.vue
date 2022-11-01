<template>
	<transition name="view-product">
	<div class="viewer-background" v-if="isOpen">
    <div class="wrapper-product">
      <div class="product">
        <div class="close-sign" @click="$emit('close', null)">X</div>
        <h2 class="title">{{ product.title }}</h2>
        <div class="description">{{ product.description }}</div>
        <div class="price">Price: ${{ product.price.toFixed(2) }}</div>
        <div class="footer">
          <button
            :disabled="!isAvailableQuantity"
            :class="{
              'opacity-5': !isAvailableQuantity,
              'cursor-default': !isAvailableQuantity,
            }"
            @click="addToCart"
          >
            Add to cart</button
          >&nbsp;
          <input
            v-model="quantityInput"
            class="quantity-input"
            type="text"
            placeholder="Enter quantity"
						ref="input"
          />&nbsp;
          <div class="quantity">
            stock balance {{ maxQuantityForCurrentProduct }}
          </div>
        </div>
      </div>
      <div class="checkout-block">
        <slot name="checkout"></slot>
      </div>
    </div>
  </div>
	</transition>
</template>

<script>

export default {
  name: "ViewProductCard",
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
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  computed: {
    isAvailableQuantity() {
      return (
        this.maxQuantityForCurrentProduct >= this.quantityInput && this.maxQuantityForCurrentProduct
      );
    },
		getProductQuantityInCart() {
			return this.$root.$data.getProductFromCart(this.product)?.stock || 0
		}
  },
  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.$emit("close");
      }
      if (this.quantityInput && e.key === "Enter") {
        this.updateCartState();
        this.$emit("close");
      }
    },
    addToCart() {
      this.updateCartState();
      this.quantityInput = null;
    },
    updateCartState() {
      if (!this.quantityInput) {
        return;
      }
			this.$root.$data.updateProductInCart(this.product, this.quantityInput)
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

.viewer-background {
  height: 100vh;
  width: 100%;
  background-color: rgba(124, 124, 124, 0.55);
  z-index: 100;
  position: fixed;
  top: 0;
}
.wrapper-product {
  position: fixed;
	min-width: 40vw;
  transform: translateX(-50%);
  top: 30%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.product {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: whitesmoke;
  border-radius: 10px;
  .close-sign {
    position: absolute;
    right: 0;
    top: 0;
    padding: 20px;
    cursor: pointer;
    font-size: 20px;
  }
  .title {
    padding: 0;
    margin: auto;
  }
  .quantity-input {
    max-width: 100px;
    padding: 5px;
    outline: none;
  }
  .close-sign:hover {
    opacity: 0.5;
  }
  .quantity {
    font-size: 14px;
    color: grey;
  }
}
.background-red {
  background-color: indianred;
}
.opacity-5 {
  opacity: 0.5;
}
.cursor-default {
  cursor: default;
}
</style>
