<template>
  <div class="wrapper">
    <div class="left-block">
      <!--      <img src="" alt="" />-->
    </div>
    <div class="right-block">
      <div @click="removeProduct" class="delete-icon">X</div>
      <div class="title">{{ product.title }}</div>
      <div class="description">{{ product.description }}</div>
      <div class="quantity">
        Quantity:
        <button @click="counter--" class="remove-item" :disabled="!moreThenOne">
          -
        </button>
        <input type="text" v-model="counter" /><button
          :disabled="!availableQuantity"
          @click="counter++"
          class="add-item"
        >
          +
        </button>
      </div>
      <div class="price">${{ product.price }}</div>
    </div>
  </div>
</template>

<script>
import { getters, mutations } from "../assets/my-store/index";

export default {
  name: "ProductInCart",
  props: {
    product: Object,
  },
  emits: { "change-quantity": Object },
  mounted() {
    this.counter = this.product.count;
    this.itemsInStore = this.getProducts;
    this.getMaxQuantity();
  },
  data() {
    return {
      counter: null,
      maxQuantity: null,
      itemsInStore: [],
    };
  },
  computed: {
    ...getters,
    availableQuantity() {
      return this.counter < this.maxQuantity;
    },
    moreThenOne() {
      return this.counter > 1;
    },
  },
  methods: {
    ...mutations,
    //при передаче аргумента в функцию "хранилища" выдает ошибку
    getMaxQuantity() {
      this.maxQuantity = this.itemsInStore.find(
        (t) => t.id === this.product.id
      ).count;
      console.log("this.maxQuantity:", this.maxQuantity);
    },
    removeProduct() {
      this.removeProductFromCart(this.product);
    },
  },
  watch: {
    counter() {
      //передавать значение инпута и id. когда меняю counter изменения в базе не происходят, поэтому компонент суммы не меняется
      this.$emit("change-quantity", {
        productId: this.product.id,
        newValue: this.counter,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  border: 1px solid black;
  width: 30%;
  img {
    width: 100%;
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
    text-align: right;
  }
}
</style>
