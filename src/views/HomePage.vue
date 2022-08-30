<template>
  <div class="container">
    <header class="home-header">
      <RouterLink to="/" class="logo-box">
        <img src="../assets/images/logo2.png" alt="logo icon" class="logo" />
      </RouterLink>
      <RouterLink to="/cart" class="home-header__cart">
        <img
          src="../assets/images/cart-icon.svg"
          alt="shopping cart icon"
          class="home-header__cart-icon"
        />
        <span class="home-header__cart-count">{{ cartItemsCount }}</span>
      </RouterLink>
    </header>
    <main class="shop">
      <div class="brands">
        <h2 class="brands__title" @click="setFilterBrand('')">All Brands</h2>
        <ul class="brands__list">
          <li
            class="brands__list-item"
            v-for="brand in brands"
            :key="brand.id"
            @click="setFilterBrand(brand.id)"
            :class="{ 'brands__list-item--active': brand.id == filterBrand }"
          >
            {{ brand.title }}
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
            @change="setItemsCount()"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import ProductItem from "../components/ProductItem.vue";
import { useCartStore } from "../stores/cartStore";

const products = ref([]);
const brands = ref([]);
const elements = ref([]);
const filterBrand = ref("");

///////////////////////// Load Data /////////////////////////

const getProducts = () => {
  fetch(`./assets/products.json`)
    .then((res) => res.json())
    .then((data) => {
      products.value = data;
      elements.value = data;
    });
};
const getBrands = () => {
  fetch(`./assets/brands.json`)
    .then((res) => res.json())
    .then((data) => {
      brands.value = data;
      getBrandNames();
    });
};
onMounted(() => {
  getProducts();
  getBrands();
});

///////////////////////// Set Filters /////////////////////////

const setFilterBrand = (id) => {
  filterBrand.value = id;
};

watch(filterBrand, () => {
  if (filterBrand.value > 0) {
    elements.value = products.value.filter((el) => {
      return el.brand == filterBrand.value;
    });
  } else {
    elements.value = products.value;
  }
});

/////////////////////////// Add brand names ///////////////////////

const getBrandNames = () => {
  products.value = products.value.map((element) => {
    let val1 = brands.value.find((brand) => brand.id == element.brand);
    return { ...element, brandName: val1.title };
  });
  elements.value = products.value.map((element) => {
    let val2 = brands.value.find((brand) => brand.id == element.brand);
    return { ...element, brandName: val2.title };
  });
};
onMounted(() => {
  getBrandNames();
});

/////////////////////////// Cart items count ///////////////////////

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

const cartItemsCount = ref(0);
const setItemsCount = () => {
  let count = 0;
  cartItems.value.forEach((el) => {
    count += el.qty;
  });
  cartItemsCount.value = count;
};
onMounted(() => {
  setItemsCount();
});
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

.home-header__cart {
  position: relative;
}

.home-header__cart-icon {
  width: 30px;
  height: auto;
  margin-right: 30px;
}

.home-header__cart-count {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  right: 15px;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: chartreuse;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shop {
  display: flex;
  align-items: flex-start;
  justify-content: stretch;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }

  & > *:first-child {
    @media screen and (max-width: 950px) {
      flex-basis: 15%;
    }
  }
  & > *:last-child {
    @media screen and (max-width: 750px) {
      flex-basis: 100%;
    }
  }

  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(1, auto);
  }
}

.brands {
  padding: 10px 20px 0;
  width: 150px;
  position: relative;

  @media screen and (max-width: 620px) {
    width: 120px;
  }
  @media screen and (max-width: 580px) {
    width: 90px;
  }
  @media screen and (max-width: 510px) {
    width: 85px;
    padding: 10px 15px 0;
    border-right: none;
  }
  @media screen and (max-width: 510px) {
    width: 100%;
  }
}

.brands__title {
  font-size: 18px;
  margin-bottom: 30px;
  width: 150px;

  &:hover {
    cursor: pointer;
  }
}

.brands__list {
  list-style: none;

  @media screen and (max-width: 500px) {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
}

.brands__list-item {
  font-size: 18px;
  padding: 7px 10px;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
  position: relative;
}

.brands__list-item::before {
  content: "";
  position: absolute;
  width: 70%;
  height: 2px;
  border-radius: 4px;
  background-color: #bbb;
  bottom: 0;
  left: 10px;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.brands__list-item:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}

.brands__list-item--active::before {
  content: "";
  position: absolute;
  width: 70%;
  height: 2px;
  border-radius: 4px;
  background-color: #bbb;
  bottom: 0;
  left: 10px;
  transform: scaleX(1);
}

.catalog {
  padding: 0 30px 50px;

  @media screen and (max-width: 510px) {
    padding: 0 15px 50px;
  }
}

.catalog__title {
  margin-bottom: 30px;
}

.catalog__container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 20px;
  justify-items: start;
  align-items: stretch;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, auto);
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, auto);
  }

  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(1, auto);
  }
}

.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;

  @media screen and (max-width: 510px) {
    padding-left: 15px;
  }
}

.logo {
  width: 120px;
}
</style>
