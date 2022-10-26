<template>
  <h1>Checkout page</h1>
  <div class="checkout">
    <div class="items-list">
      <ProductInCart
        @input-changed="test"
        v-for="product of productsInCart"
        :product="product"
        :key="product.id"
      />
    </div>
    <CheckoutCard :update="updateKey" />
  </div>
</template>
<script>
import ProductInCart from "../components/ProductInCart";
import CheckoutCard from "../components/CheckoutCard";
import { getters } from "../assets/my-store/index";

export default {
  name: "Checkout-page",
  components: {
    ProductInCart,
    CheckoutCard,
  },
  mounted() {
    this.productsInCart = this.getCartProducts;
  },
  data() {
    return {
      productsInCart: [],
      //костыль, хотя тут весь код один сплошной костыль
      updateKey: 0,
    };
  },
  computed: {
    ...getters,
  },
  methods: {
    test() {
      console.log("Input Changed!");
      this.updateKey++;
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
.checkout {
  display: flex;
  width: 80vw;
  margin: auto;
  gap: 20px;
}
.items-list {
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 15px;
}
</style>
