<template>
  <div class="product-card">
    <router-link style="text-decoration: none" :to="{name: 'productCard.show', params: {productName: product.title}}">
			<h3>{{ product.title }}</h3>
		</router-link>
			<div class="description">{{ descriptionHandler }}</div>
			<div class="price">Price: ${{ product.price.toFixed(2) }}</div>
		<slot>
			<div class="footer">
				<button
					:disabled="!isAvailable"
					:class="{ 'opacity-5': !isAvailable }"
					@click="$emit('product-view', product)"
				>
					View product</button
				>&nbsp;<button
					@click="$emit('quick-buy', product)"
					:disabled="!isAvailable"
					:class="{ 'opacity-5': !isAvailable }"
				>
					Quick Buy
				</button>
			</div>
		</slot>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {type: Object, required: true},
  },
  emits: {
    "product-view": Object,
    "quick-buy": Object,
  },
  computed: {
    descriptionHandler() {
      return this.product.description.substring(0, 50);
    },
    isAvailable() {
      return this.product.stock;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.product-card {
  display: flex;
	justify-content: space-between;
	height: 100%;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background-color: sandybrown;
  box-shadow: 0 0 5px grey;
  padding: 10px;
  border-radius: 15px;
	cursor: pointer;
}
.disabled {
  &:before {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.footer {
  display: flex;
  justify-content: center;
	gap: 10px;
  align-items: flex-end;
  button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: rgb(79, 160, 187);
    color: black;
    font-weight: bold;
    cursor: pointer;
    outline: none;
  }
  button:hover {
    transform: scale(1.05);
    transition-duration: 0.4s;
    transition-delay: 0.1s;
  }
}
</style>
