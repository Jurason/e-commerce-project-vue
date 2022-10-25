<template>
  <div class="viewer-background" v-if="isOpen">
    <div class="product">
      <div class="close-sign" @click="$emit('close', null)">X</div>
      <h2 class="title">{{ product.title }}</h2>
      <div class="description">{{ product.description }}</div>
      <div class="price">Price: ${{ product.price.toFixed(2) }}</div>
      <div class="footer">
        <button @click="addToCart">Add to cart</button>&nbsp;
        <input
          v-model="quantityInput"
          class="quantity-input"
          type="text"
          placeholder="Enter quantity"
        />&nbsp;
        <div class="quantity">stock balance {{ remainingInStock }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../assets/my-store/index";

export default {
  name: "ViewProductCard",
  data() {
    return {
      quantityInput: null,
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
    document.removeEventListener(this.handleKeydown);
  },
  computed: {
    productQuantity() {
      console.log("this.product:", this.product);
      console.log("this.product.id:", this.product.id);
      console.log(
        "store.getProductQuantity(this.product.id):",
        store.getProductQuantity(6)
      );

      return store.getProductQuantity(this.product);
    },
    remainingInStock() {
      return this.productQuantity - this.quantityInput;
    },
  },
  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.$emit("close");
      }
    },
    addToCart() {
      this.updateStoreState();
      console.log("store.cart:", store.cart);
      console.log("store.state:", store.state);
    },
    updateStoreState() {
      if (!this.quantityInput) {
        return;
      }
      store.addProductToCart(this.product, this.quantityInput);
    },
  },
  watch: {
    isOpen() {
      this.quantityInput = null;
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
  .close-sign:hover {
    opacity: 0.8;
  }
  .quantity-input {
    max-width: 100px;
    padding: 5px;
    outline: none;
  }
  .quantity {
    font-size: 14px;
    color: grey;
  }
}
</style>
