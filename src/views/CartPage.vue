<template>
  <div class="cartPage container">
    <header class="cart-header">
      <RouterLink to="/">
        <img src="../../assets/images/logo2.png" alt="logo icon" class="logo"/>
      </RouterLink>
    </header>
    <h1 class="cartPage__title">Shopping Cart</h1>
    <div v-if="cartItems.length <= 0" class="cartPage__empty">
      <p class="cartPage__empty-text">Cart is empty...</p>
    </div>
    <CartItem 
      v-for="cartItem in cartItems" 
      :key="cartItem.id" 
      :cartItem="cartItem"
    />
    <span class="cartPage__subtotal">Subtotal: ${{subTotal}}</span>
    <div class="cartPage__btn-box">
      <button class="cartPage__check-btn">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useCartStore } from '../stores/cartStore';
import CartItem from '../components/CartItem.vue';

const cartStore = useCartStore()
const {cartItems} = storeToRefs(cartStore)
const subTotal = ref(0)


onMounted(() => {
  let n = 0
  cartItems.value.map(el => {n += el.regular_price.value * el.qty})
  subTotal.value = n
})
watch(cartItems, () => {
  let n = 0
  cartItems.value.map(el => {n += el.regular_price.value * el.qty})
  subTotal.value = Math.ceil(n*100)/100
  // subTotal.value = cartItems.value.reduce((tot, num) => {tot += el.regular_price.value * el.qty})
})

</script>

<style lang="scss" scoped>
.cart-header {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
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
}
.cartPage__btn-box {
  display: flex;
  justify-content: flex-end;
}
.cartPage__check-btn {
  padding: 10px 50px;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: chartreuse;
  cursor: pointer;
  transition: .2s ease-in;

  &:hover {
    background-color: rgb(131, 238, 24);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(-1px);
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

</style>

