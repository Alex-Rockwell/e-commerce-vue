<template>
  <div class="product">
    <div class="product__img-box">
      <img
        :src="`./assets/${imageSrc}`"
        :alt="product.title"
        class="product__img"
      />
    </div>
    <div class="product__desc-box">
      <h2 class="product__title">{{ product.title }}</h2>
      <p class="product__desc">Brand: {{ product.brandName }}</p>
      <p class="product__desc">Price: {{ product.regular_price.value }}$</p>
      <button
        class="pruduct__cart-btn"
        @click="
          {
            needSelectedOptions
              ? alertOptions()
              : handleAddToCart(product, colorToCart, sizeToCart);
          }
        "
      >
        <img
          src="../assets/images/cart-icon.svg"
          alt="cart icon"
          class="productItem__cart-icon"
        />
      </button>
    </div>
    <div v-if="product.type == 'configurable'" class="product__options-box">
      <div>
        <button
          v-for="el in colorValues"
          :key="el.valueIndex"
          class="product__color"
          :style="{ backgroundColor: el.value }"
          @click="setActiveColor(el.label.toLowerCase())"
          :class="{
            active: activeColor[el.label.toLowerCase()],
            notAvailable: !availableColor[el.label.toLowerCase()],
          }"
        ></button>
      </div>
      <div>
        <button
          v-for="el in sizeValues"
          :key="el.valueIndex"
          class="product__size"
          @click="setActiveSize('size' + el.label)"
          :class="{
            active: activeSize['size' + el.label],
            notAvailable: !availableSize['size' + el.label],
          }"
        >
          {{ el.label }}
        </button>
      </div>
      <ModalAlertOptions v-if="isOpen" v-model:show="isOpen" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue-demi";
import { useCartStore } from "../stores/cartStore";
import ModalAlertOptions from "./ModalAlertOptions.vue";

const props = defineProps(["product"]);

const cartStore = useCartStore();
const { addCartItem } = cartStore;

const emit = defineEmits(["change"]);
const handleAddToCart = (product, colorToCart, sizeToCart) => {
  addCartItem(product, colorToCart, sizeToCart);
  emit("change");
};

const isOpen = ref(false);

//////////////////////  Define active and available options /////////////////////////

const currentColor = ref("");

const activeColor = reactive({});
const availableColor = reactive({});
const colorValues = ref();

const getColorOptions = () => {
  if (props.product.configurable_options) {
    let colorObj = props.product.configurable_options.find(
      (el) => el.attribute_code == "color"
    );
    colorValues.value = colorObj.values;
    colorValues.value.forEach((el) => {
      activeColor[el.label.toLowerCase()] = false;
      availableColor[el.label.toLowerCase()] = true;
    });
  }
};
onMounted(() => {
  getColorOptions();
});

const activeSize = reactive({});
const availableSize = reactive({});
const sizeValues = ref();

const getSizeOptions = () => {
  if (props.product.configurable_options) {
    let sizeObj = props.product.configurable_options.find(
      (el) => el.attribute_code == "size"
    );
    sizeValues.value = sizeObj.values;
    sizeValues.value.forEach((el) => {
      activeSize["size" + el.label] = false;
      availableSize["size" + el.label] = true;
    });
  }
};
onMounted(() => {
  getSizeOptions();
});

/////////////////////////  Check initial available options ///////////////////////////

const getInitialAvailableColors = () => {
  if (props.product.variants) {
    let availableOptionsSku = props.product.variants.map(
      (el) => el.product.sku
    );
    for (const key in availableColor) {
      availableColor[key] = availableOptionsSku.some((el) => el.includes(key));
    }
  }
};
const getInitialAvailableSizes = () => {
  if (props.product.variants) {
    let availableOptionsSku = props.product.variants.map(
      (el) => el.product.sku
    );
    for (const key in availableSize) {
      availableSize[key] = availableOptionsSku.some((el) => {
        return el.endsWith(key.slice(-1).toLowerCase());
      });
    }
  }
};

onMounted(() => {
  getInitialAvailableColors();
  getInitialAvailableSizes();
});

//////////////////////  Set active colors /////////////////////////

const setActiveColor = (arg) => {
  currentColor.value = arg;
  if (activeColor[arg] == true) {
    activeColor[arg] = false;
    getInitialAvailableSizes();
    return;
  }
  for (const key in activeColor) {
    if (arg == key) {
      activeColor[key] = true;
    } else {
      activeColor[key] = false;
    }
  }
  defineAvailableSizes(arg);
};
const defineAvailableSizes = (arg) => {
  let availableOptionsSku = props.product.variants.map((el) => el.product.sku);
  let temp = availableOptionsSku.filter((el) => el.includes(arg));
  for (const key in availableSize) {
    if (temp.some((el) => el.endsWith(key.slice(-1).toLowerCase()))) {
      availableSize[key] = true;
    } else {
      availableSize[key] = false;
    }
  }
};

//////////////////////  Set active sizes /////////////////////////

const setActiveSize = (arg) => {
  if (activeSize[arg] == true) {
    activeSize[arg] = false;
    getInitialAvailableColors();
    return;
  }
  for (const key in activeSize) {
    if (arg == key) {
      activeSize[key] = true
    } else {
      activeSize[key] = false
    }
  }
  defineAvailableColors(arg);
};

const defineAvailableColors = (arg) => {
  let availableOptionsSku = props.product.variants.map((el) => el.product.sku);
  let temp = availableOptionsSku.filter((el) =>
    el.endsWith(arg[arg.length - 1].toLowerCase())
  );
  for (const key in availableColor) {
    if (temp.some((el) => el.includes(key))) {
      availableColor[key] = true;
    } else {
      availableColor[key] = false;
    }
  }
};

///////////////////  Define active colors and sizes  //////////////////////
///////////////////  and send it to cart  /////////////////////////////////

const colorToCart = ref("");
const sizeToCart = ref("");
watch([activeColor, activeSize], () => {
  for (const key in activeColor) {
    if (activeColor[key] == true) {
      colorToCart.value = key;
    }
  }
  for (const key in activeSize) {
    if (activeSize[key] == true) {
      sizeToCart.value = key.slice(-1);
    }
  }
});

///////////////////  Get image with active color  //////////////////////

const imageSrc = ref();
onMounted(() => {
  imageSrc.value = props.product.image;
});
watch([activeColor, activeSize], () => {
  if (props.product.type == "configurable") {
    let productOpt = props.product.variants.map((el) => el.product);
    let activeElement = productOpt.filter((el) =>
      el.sku.includes(currentColor.value)
    );
    imageSrc.value = activeElement[0].image.replace("image", "images");
  }
});

///////////////////  Check active options before add to Cart  //////////////////////

const optionsChecked = () => {
  let colorCheck = false;
  let sizeCheck = false;
  let res = false;
  for (const key in activeColor) {
    if (activeColor[key] == true) colorCheck = true;
  }
  for (const key in activeSize) {
    if (activeSize[key] == true) sizeCheck = true;
  }
  if (colorCheck && sizeCheck) {
    res = true;
  } else {
    res = false;
  }
  return res;
};

const needSelectedOptions = ref(false);
onMounted(() => {
  needSelectedOptions.value =
    props.product.type == "configurable" ? true : false;
});

watch([activeColor, activeSize], () => {
  needSelectedOptions.value = !optionsChecked();
});

const alertOptions = () => {
  isOpen.value = true;
};
</script>


<style lang="scss" scoped>
.product {
  height: auto;
  border: 1px solid #bbb;
}

.product__img-box {
  max-width: 282px;
  height: auto;

  @media screen and (max-width: 900px) {
    max-width: 258px;
  }
  @media screen and (max-width: 750px) {
    max-width: 420px;
  }
}

.product__img {
  width: 100%;
  height: auto;
  display: block;
  transition: 0.6s ease-in-out;
}

.product__img-box:hover .product__img {
  transform: scale(1.05);
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
  user-select: none;
  opacity: 0.2;
  transition: background-color 0.4s ease;
  transition: opacity 0.6s ease;

  &:hover {
    cursor: pointer;
    background-color: chartreuse;
  }

  @media (hover: none) {
    opacity: 1;
  }
}

.product:hover .pruduct__cart-btn {
  opacity: 1;
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
}

.product__size {
  display: inline-block;
  height: 18px;
  width: 18px;
  margin-right: 10px;
  border: 1px solid #333;
  background-color: transparent;
  font-size: 13px;
  user-select: none;

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
  pointer-events: none;
}

.productItem__cart-icon {
  width: 20px;
  height: auto;
}
</style>
