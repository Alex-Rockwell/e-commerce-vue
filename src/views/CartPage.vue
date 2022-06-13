<template>
  <div class="cartPage container">
    <header class="cart-header">
      <RouterLink to="/">
        <img src="../assets/images/logo.png" alt="logo icon" class="logo" />
      </RouterLink>
    </header>
    <h1 class="cartPage__title">Shopping Cart</h1>

    <div v-if="cartItems.length > 0" class="cartPage__subtitle">
      <h2 class="cartPage__item">Item</h2>
      <div class="cartPage__rightbox">
        <h3 class="cartPage__price">Price</h3>
        <h3 class="cartPage__qty">Qty</h3>
        <h3 class="cartPage__total">Total</h3>
      </div>
    </div>

    <div v-if="cartItems.length <= 0" class="cartPage__empty">
      <p class="cartPage__empty-text">Cart is empty...</p>
    </div>
    <CartItem
      v-for="cartItem in cartItems"
      :key="cartItem.id"
      :cartItem="cartItem"
    />

    <span class="cartPage__subtotal">Subtotal: ${{ subTotal }}</span>
    <div class="cartPage__btn-box">
      <ButtonMain>Checkout</ButtonMain>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useCartStore } from "../stores/cartStore";
import CartItem from "../components/CartItem.vue";
import ButtonMain from "../components/ButtonMain.vue";

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);
const subTotal = ref(0);

//////////////////////  Calculate subtotal sum /////////////////////////

const getSubTotal = () => {
  let n = 0;
  cartItems.value.forEach((el) => {
    n += el.regular_price.value * el.qty;
  });
  subTotal.value = Math.ceil(n * 100) / 100;
}

onMounted(() => {
  getSubTotal()
});
watch(cartItems, () => {
  getSubTotal()
});
</script>

<style lang="scss" scoped>
.cart-header {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;

  @media screen and (max-width: 640px) {
    justify-content: flex-start;
  }
}

.cartPage {
  padding: 0 20px;
}

.cartPage__title {
  margin-bottom: 30px;
}
.cartPage__subtotal {
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;

  @media screen and (max-width: 640px) {
    justify-content: flex-start;
  }
}

.cartPage__btn-box {
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 640px) {
    justify-content: flex-start;
  }
}

.cartPage__empty {
  height: 30vh;
  width: 100%;
  border: 1px solid #999;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 50px;
}

.cartPage__empty-text {
  color: #777;
  font-size: 18px;
}

.logo {
  width: 120px;
}

.cartPage__subtitle {
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 640px) {
    display: none;
  }
}

.cartPage__item {
  margin-right: auto;
  padding-left: 230px;

  @media screen and (max-width: 640px) {
    padding-left: 200px;
  }
}

.cartPage__rightbox {
  align-items: center;
  justify-content: flex-start;
  display: flex;
  padding-right: 40px;

  @media screen and (max-width: 640px) {
    padding-left: 25px;
    padding-top: 30px;
  }
}

.cartPage__price {
  font-size: 18px;
  margin-right: 10px;
}

.cartPage__qty {
  width: 30px;
  margin-left: 45px;
  font-size: 18px;
  padding: 3px;
}

.cartPage__total {
  width: 50px;
  margin-left: 45px;
  font-size: 18px;
}

.cartPage__delete-btn {
  border: none;
  background-color: transparent;
  margin-left: 30px;
}
</style>
