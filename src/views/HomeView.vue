<template>
  <div class="product-list">
    <ProductCard
      @product-view="productView($event)"
      v-for="product of products"
      :key="product.id"
      :product="product"
    />
  </div>
  <ViewProductCard
    :is-open="active.productViewer"
    :product="currentProductForView"
    @close="active.productViewer = false"
  />
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import ViewProductCard from "../components/ViewProductCard";
import { getters } from "../assets/my-store/index";

export default {
  name: "HomeView",
  components: {
    ProductCard,
    ViewProductCard,
  },
  mounted() {
    this.products = this.getProducts();
  },
  data() {
    return {
      products: [],
      currentProductForView: null,
      active: {
        productViewer: false,
      },
    };
  },
  methods: {
    ...getters,
    productView(product) {
      this.currentProductForView = product;
      this.active.productViewer = true;
    },
  },
};
</script>
<style>
.product-list {
  display: flex;
  max-width: 80%;
  margin: auto;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}
</style>
