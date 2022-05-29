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
    </div>
  </div>
</template>

<script setup>

defineProps(['product'])

</script>

<style lang="scss" scoped>
.product {
  height: 400px;
  width: 300px;
  // background-color: cornflowerblue;
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
</style>