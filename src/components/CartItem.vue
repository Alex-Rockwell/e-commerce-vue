<template>
  <div class="cart-item">
    <div class="cart-item__left-box">
      <div class="cart-item__img-box">
        <img :src="imageSrc" :alt="cartItem.title" class="cart-item__img" />
      </div>
      <div class="cart-item__desc-box">
        <h3 class="cart-item__name">
          <span>{{ cartItem.brandName }} / </span>
          <span>{{ cartItem.title }}</span>
        </h3>
        <div v-if="cartItem.type == 'configurable'" class="cart-item__info">
          <h4>Color: {{ cartItem.colorToCart }}</h4>
          <h4>Size: {{ cartItem.sizeToCart }}</h4>
        </div>
      </div>
    </div>
    <div class="cart-item__rightbox">
      <span class="cart-item__price">${{ cartItem.regular_price.value }}</span>
      <input type="number" class="cart-item__qty" v-model="qty" />
      <span class="cart-item__total">${{ total }}</span>
      <button
        class="cart-item__delete-btn"
        @click="deleteCartItem(cartItem.id)"
      >
        <img
          src="./assets/images/trash-bin-icon.svg"
          alt="delete icon"
          class="cart-item__delete-icon"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useCartStore } from "../stores/cartStore";

const props = defineProps(["cartItem", "cartItems"]);
const qty = ref(props.cartItem.qty);
const total = ref(props.cartItem.regular_price.value);

const cartStore = useCartStore();
const { changeQty, deleteCartItem } = cartStore;

//////////////////////  Calculate total price /////////////////////////

const getTotal = () => {
  total.value =
    qty.value <= 0
      ? 0
      : Math.ceil(props.cartItem.regular_price.value * qty.value * 100) / 100;
};

onMounted(() => {
  getTotal();
});
watch(qty, () => {
  getTotal();
});

//////////////////////  Change qantity in store /////////////////////////

watch(total, () => {
  changeQty(props.cartItem.id, qty.value);
});
onMounted(() => {
  changeQty(props.cartItem.id, qty.value);
});

//////////////////////  Set image source /////////////////////////

const imageSrc = ref("");

onMounted(() => {
  if (props.cartItem.type != "configurable") {
    imageSrc.value = `./assets/${props.cartItem.image}`;
  }
  if (props.cartItem.type == "configurable") {
    let productsArray = props.cartItem.variants.map((el) => el.product);
    let product = productsArray.find((el) => {
      return el.id == props.cartItem.configurableId;
    });
    let currImg = product.image.replace("image", "images");
    imageSrc.value = `./assets/${currImg}`;
  }
});
</script>

<style lang="scss" scoped>
.cart-item {
  border-bottom: 1px solid #333;
  padding-bottom: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.cart-item__left-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: auto;
}

.cart-item__rightbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 640px) {
    padding-left: 25px;
    padding-top: 30px;
  }
}

.cart-item__name {
  @media screen and (max-width: 360px) {
    display: flex;
    flex-direction: column;
  }
}

.cart-item__img-box {
  width: 150px;
  height: 150px;
}

.cart-item__img {
  width: 100%;
  height: auto;
  display: block;
}

.cart-item__desc-box {
  margin-right: auto;
}

.cart-item__info {
  margin-top: 10px;

  & > * {
    margin-bottom: 5px;
  }
}

.cart-item__price {
  font-size: 18px;
}

.cart-item__qty {
  width: 30px;
  margin-left: 40px;
  font-size: 15px;
  padding: 3px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }

  @media screen and (max-width: 360px) {
    margin-left: 25px;
  }
}

.cart-item__total {
  width: 50px;
  margin-left: 40px;
  font-size: 18px;

  @media screen and (max-width: 360px) {
    margin-left: 25px;
  }
}

.cart-item__delete-btn {
  border: none;
  background-color: transparent;
  margin-left: 30px;

  &:hover {
    cursor: pointer;
  }
}

.cart-item__delete-icon {
  width: 17px;
  height: auto;
}
</style>
