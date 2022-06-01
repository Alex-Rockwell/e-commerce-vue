<template>
  <div class="product">
    <div class="product__img-box">
      <img
        :src="`../../assets/${product.image}`"
        :alt="product.title"
        class="product__img"
      />
    </div>
    <div class="product__desc-box">
      <h2 class="product__title">{{ product.title }}</h2>
      <p class="product__desc">Brand: {{ product.brandName }}</p>
      <p class="product__desc">Price: {{ product.regular_price.value }}$</p>
      <button class="pruduct__cart-btn" @click="addCartItem(product)">
        <img
          src="../../assets/images/cart-icon.svg"
          alt="cart icon"
          class="productItem__cart-icon"
        />
      </button>
    </div>
    <div v-if="product.type == 'configurable'" class="product__options-box">
      <div>
        <button
          class="product__color product__color--red"
          @click="setActiveColor('red')"
          :class="{ active: activeColor.red }"
        ></button>
        <!-- :class="{ active: activeColor.red, notAvailable: !available.red }" -->
        <button
          class="product__color product__color--blue"
          @click="setActiveColor('blue')"
          :class="activeColor.blue ? 'active' : ''"
        ></button>
        <button
          class="product__color product__color--black"
          @click="setActiveColor('black')"
          :class="activeColor.black ? 'active' : ''"
        ></button>
      </div>
      <div>
        <button
          class="product__size product__size--m"
          @click="setActiveSize('sizeM')"
          :class="{
            active: activeSize.sizeM,
            notAvailable: !availableSize.sizeM,
          }"
        >
          M
        </button>
        <button
          class="product__size product__size--l"
          @click="setActiveSize('sizeL')"
          :class="{
            active: activeSize.sizeL,
            notAvailable: !availableSize.sizeL,
          }"
        >
          L
        </button>
      </div>
      <!-- <h3>red: {{ activeColor.red }}</h3>
      <h3>blue: {{ activeColor.blue }}</h3>
      <h3>black: {{ activeColor.black }}</h3> -->
      <h3>sizeM: {{ availableSize.sizeM }}</h3>
      <h3>sizeL: {{ availableSize.sizeL }}</h3>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue-demi";
import { useCartStore } from "../stores/cartStore";

const props = defineProps(["product"]);

const cartStore = useCartStore();
const { addCartItem } = cartStore;

/////////////////////////  Stage 3-1 ///////////////////////////

// const options = reactive({
//   red: false,
//   blue: false,
//   black: false,
//   sizeM: false,
//   sizeL: false,
// });

// onMounted(() => {
//   if (props.product.variants) {
//     let availableOptionsSku = props.product.variants.map(
//       (el) => el.product.sku
//     );
//     // console.log(availableOptionsSku)
//     options.red = availableOptionsSku.some((el) => el.includes("red"));
//     options.blue = availableOptionsSku.some((el) => el.includes("blue"));
//     options.black = availableOptionsSku.some((el) => el.includes("black"));
//     options.sizeM = availableOptionsSku.some((el) => el.endsWith("m"));
//     options.sizeL = availableOptionsSku.some((el) => el.endsWith("l"));
//     // console.log('!!!!!!!', availableOptionsSku.some(el => el.includes("red")))
//   }
// });

/////////////////////////  Stage 3-2 ///////////////////////////

const activeColor = reactive({
  red: false,
  blue: false,
  black: false,
});
const activeSize = reactive({
  sizeM: false,
  sizeL: false,
});
const availableColor = reactive({
  red: true,
  blue: true,
  black: true,
});
const availableSize = reactive({
  sizeM: true,
  sizeL: true,
});

const setActiveColor = (arg) => {
  let availableOptionsSku = props.product.variants.map((el) => el.product.sku);
  if (arg == "red") {
    activeColor.red = true;
    activeColor.blue = false;
    activeColor.black = false;
    let temp = availableOptionsSku.filter((el) => el.includes("red"));
    defineAvailableSizes(temp)
    return;
  }
  if (arg == "blue") {
    activeColor.blue = true;
    activeColor.red = false;
    activeColor.black = false;
    let temp = availableOptionsSku.filter((el) => el.includes("blue"));
    defineAvailableSizes(temp)
    return;
  }
  if (arg == "black") {
    activeColor.black = true;
    activeColor.red = false;
    activeColor.blue = false;
    let temp = availableOptionsSku.filter((el) => el.includes("black"));
    defineAvailableSizes(temp)
    return;
  }
};
const defineAvailableSizes = (temp) => {
  if (temp.some((el) => el.endsWith("m"))) {
    availableSize.sizeM = true;
  } else {
    availableSize.sizeM = false;
  }
  if (temp.some((el) => el.endsWith("l"))) {
    availableSize.sizeL = true;
  } else {
    availableSize.sizeL = false;
  }
};
const setActiveSize = (arg) => {
  switch (arg) {
    case "sizeM":
      activeSize.sizeM = true;
      activeSize.sizeL = false;
      break;
    case "sizeL":
      activeSize.sizeL = true;
      activeSize.sizeM = false;
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.product {
  height: auto;
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
  padding: 0 20px 10px;
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

.product__options-box {
  padding: 0 20px;
  margin-bottom: 30px;

  & > *:first-child {
    margin-bottom: 7px;
  }
}
.product__color {
  display: inline-block;
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &--red {
    background-color: red;
  }
  &--blue {
    background-color: blue;
  }
  &--black {
    background-color: black;
  }
}

.product__size {
  display: inline-block;
  height: 18px;
  width: 18px;
  margin-right: 10px;
  border: 1px solid #333;
  background-color: transparent;
  font-size: 13px;

  &:hover {
    cursor: pointer;
  }
}
.active {
  outline: 2px solid red;
  outline-offset: 2px;
}
.notAvailable {
  opacity: 0.3;
  cursor: default !important;
}

.productItem__cart-icon {
  width: 20px;
  height: auto;
}
</style>
