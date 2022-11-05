<template>
	<div class="wrapper">
    <div class="left-block">
			<img :src="product.images['0']" alt="product" />
    </div>
    <div class="right-block">
      <div @click="removeProduct" class="delete-icon">X</div>
      <div class="title">{{ product.title }}</div>
      <div class="description">{{ product.description }}</div>
      <div class="quantity">Quantity:
				<button
						@click="counter--"
						class="remove-item"
						:disabled="!moreThenOne"
				>-</button>
        <input type="text" v-model="counter" />
				<button
          :disabled="!availableQuantity"
          @click="counter++"
          class="add-item"
        >+</button>
      </div>
      <div class="price">${{ product.price }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProductInCart",
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
			return this.$root.$data.getProductFromStore(this.product).stock;
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
.wrapper {
  width: 100%;
  height: 20vh;
  margin-left: auto;
  margin-right: auto;
  min-height: 100px;
  border: 2px solid yellowgreen;
  display: flex;
  background-color: sandybrown;
  box-shadow: 0 0 5px grey;
  padding: 10px;
  border-radius: 15px;
  position: relative;
}
.left-block {
  //width: 30%;
  img {
    width: 100%;
		height: 100%;
  }
}
.right-block {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 20px;
  justify-content: space-between;
  .delete-icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  .delete-icon:hover {
    opacity: 0.5;
  }
  .title {
    font-weight: bold;
  }
  .description {
  }
  .quantity {
    input {
      width: 50px;
      text-align: center;
    }
  }
  .price {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 10px;
  }
}
</style>
