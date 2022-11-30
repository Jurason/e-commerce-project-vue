<template>
  <div class="product-card">
    <router-link style="text-decoration: none" :to="{name: 'productCard.show', params: {productName: product.title}}">
			<h3 class="product-card__title">{{ product.title }}</h3>
		</router-link>
			<div class="product-card__description">{{ descriptionHandler }}</div>
			<div class="product-card__price">Price: ${{ priceHandler }}</div>
		<slot>
			<div class="product-card__footer">
				<BaseButton
						name="View product"
						:disabled="!isAvailable"
						@click="$emit('product-view', product)"
				/>&nbsp;
				<BaseButton
						name="Quick Buy"
						:disabled="!isAvailable"
						@click="$emit('quick-buy', product)"
				/>
			</div>
		</slot>
  </div>
</template>

<script>
import BaseButton from "../../components/BaseButton";

export default {
  name: "ProductCard",
	components: {
		BaseButton
	},
	props: {
    product: {type: Object, required: true},
  },
  emits: {
    "product-view": Object,
    "quick-buy": Object,
  },
  computed: {
    descriptionHandler() {
			if(!this.product.description){
				return
			}
      return this.product.description.substring(0, 50);
    },
		priceHandler(){
			if(!this.product.price){
				return
			}
			return this.product.price.toFixed(2)
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
  gap: 5px;
  align-items: center;
  background-color: rgb(235, 229, 227);
  box-shadow: 0 0 5px grey;
  padding: 10px;
  border-radius: 15px;
	cursor: pointer;
}
.product-card__title {
	color: black;
}
.disabled {
  &:before {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.product-card__footer {
  display: flex;
  justify-content: center;
	gap: 10px;
  align-items: flex-end;
}

</style>
