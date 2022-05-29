<template>
  <div>
    <header class="home-header container">
      <RouterLink to="/">
        <img src="../../assets/images/logo.png" alt="logo icon" />
      </RouterLink>
      <RouterLink to="/cart">
        <img
          src="../../assets/images/cart-icon.svg"
          alt="shopping cart icon"
          class="home-header__cart-icon"
        />
      </RouterLink>
    </header>
    <main class="shop container">
      <div class="brands">
        <h2 class="brands__title">All Brands</h2>
        <ul class="brands__list">
          <li class="brands__list-item" v-for="brand in brands" :key="brand.id">
            {{brand.title}}
          </li>
        </ul>
      </div>
      <div class="catalog">
        <h1 class="catalog__title">Catalog</h1>
        <div class="catalog__container">
          <ProductItem 
            v-for="element in elements"
            :key="element.id"
            :product="element"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { RouterLink } from "vue-router";
import ProductItem from "../components/ProductItem.vue";

const products = ref([]);
const brands = ref([]);
const elements = ref([]);

const getProducts = () => {
  fetch(`../../assets/products.json`)
    .then((res) => res.json())
    .then((data) => {
      products.value = data;
      elements.value = data;
      // console.log('elements: ', elements.value);
    });
};
const getBrands = () => {
  fetch(`../../assets/brands.json`)
    .then((res) => res.json())
    .then((data) => {
      brands.value = data;
      // console.log('brands: ', data);
    });
};
onMounted(() => {
  getProducts();
  getBrands();
});

watch(brands, () => {
  elements.value = elements.value.map((element) => {
    const val = brands.value.find(brand => brand.id === element.id)
    return { ...element, brandName: val.title };
  })
})

</script>

<style lang="scss" scoped>
.home-header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
}
.home-header__cart-icon {
  width: 30px;
  height: auto;
  margin-right: 30px;
}
.shop {
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
}
.brands {
  padding: 10px 20px 0;
}
.brands__title{
  width: 150px;
  font-size: 18px;
  margin-bottom: 30px;
}
.brands__list {
  list-style: none;
}
.brands__list-item {
  font-size: 18px;
  padding: 7px 10px;
  border-radius: 3px;
  transition: .2s ease;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
}

.catalog {
  padding: 0 30px 50px;
}
.catalog__title {
  margin-bottom: 30px;
}
.catalog__container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 20px;
}
</style>
