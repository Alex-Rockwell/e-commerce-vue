<template>
  <div class="product">
    <div class="product__img-box">
      <img 
        :src="`../../assets/${product.image}`" 
        :alt="product.title"
        class="product__img"
      >
    </div>
    <div class="product__desc-box">
      <h2 class="product__title">{{product.title}}</h2>
      <p class="product__desc">Brand: {{product.brandName}}</p>
      <p class="product__desc">Price: {{product.regular_price.value}}$</p>
      <button class="pruduct__cart-btn" @click="addCartItem(product)">
        <img
          src="../../assets/images/cart-icon.svg"
          alt="cart icon"
          class="productItem__cart-icon"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';



defineProps(['product'])

const cartStore = useCartStore()
const {addCartItem} = cartStore

</script>

<style lang="scss" scoped>
.product {
  height: 400px;
  width: 300px;
  border: 1px solid #bbb;
}
.product__img-box {
  width: 300px;
  height: 300px;
}
.product__img {
  width: 100%;
  height: auto;
  display: block;
}
.product__desc-box {
  padding: 0 20px;
  position: relative;
}
.product__title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  margin-bottom: 10px;
}
.product__desc {
  margin-bottom: 5px;
}
.pruduct__cart-btn {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 20px;
  width: 30px;
  height: 30px;
  border: 1px solid #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: chartreuse;
  }
}
.productItem__cart-icon {
  width: 20px;
  height: auto;
}
</style>