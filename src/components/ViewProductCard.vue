<template>
  <div class="viewer-background" v-if="isOpen">
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
        />&nbsp;
        <div class="quantity">
          stock balance {{ maxQuantityForCurrentProduct }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getters, mutations } from "../assets/my-store/index";

export default {
  name: "ViewProductCard",
  data() {
    return {
      quantityInput: null,
      maxQuantityForCurrentProduct: null,
      currentProductQuantityInCart: 0,
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
    ...getters,
    isAvailableQuantity() {
      return this.product.count >= this.quantityInput;
    },
  },
  methods: {
    ...mutations,
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
      this.$emit("close");
      this.quantityInput = null;
    },
    updateCartState() {
      if (!this.quantityInput) {
        return;
      }
      this.addProductToCart(this.product, this.quantityInput);
    },
  },
  watch: {
    isOpen() {
      this.currentProductQuantityInCart =
        this.getCartProducts.find((t) => t.id === this.product.id)?.count || 0;
      this.maxQuantityForCurrentProduct =
        this.product.count - this.currentProductQuantityInCart;
    },
  },
};
</script>

<style lang="scss">
.viewer-background {
  height: 100vh;
  width: 100%;
  background-color: rgba(124, 124, 124, 0.55);
  z-index: 100;
  position: fixed;
  top: 0;
}
.product {
  top: 30%;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 101;
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
