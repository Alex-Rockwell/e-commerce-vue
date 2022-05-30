<template>
    <div class="cart-item">
      <div class="cart-item__img-box">
        <img 
          :src="`../../assets/${cartItem.image}`" 
          :alt="cartItem.title"
          class="cart-item__img"
        >
      </div>
      <h3 class="cart-item__name">{{cartItem.brandName}} / {{cartItem.title}}</h3>
      <span class="cart-item__price">${{cartItem.regular_price.value}}</span>
      <input type="number" class="cart-item__qty" v-model="qty" >
      <span class="cart-item__total">${{total}}</span>
      <button class="cart-item__delete-btn" @click="deleteCartItem(cartItem.id)">
        <img
          src="../../assets/images/trash-bin-icon.svg"
          alt="delete icon"
          class="cart-item__delete-icon"
        />
      </button>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useCartStore } from '../stores/cartStore';

const props = defineProps(['cartItem'])
const qty = ref(1)
const total = ref(props.cartItem.regular_price.value)

const cartStore = useCartStore()
const {changeQty, deleteCartItem} = cartStore

watch(qty, () => {
  total.value = (qty.value <= 0) ? 0 : Math.ceil((props.cartItem.regular_price.value*qty.value)*100)/100
})


watch(total, () => {
  changeQty(props.cartItem.id, qty.value)
})
onMounted(() => {
  changeQty(props.cartItem.id, qty.value)
})


</script>

<style lang="scss" scoped>
.cart-item {
  border-bottom: 1px solid #333;
  padding-bottom: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
.cart-item__name {
  margin-right: auto;
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
}

.cart-item__total {
  width: 50px;
  margin-left: 40px;
  font-size: 18px;
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