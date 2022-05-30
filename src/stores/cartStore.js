import { defineStore } from 'pinia'

export const useCartStore = defineStore({
  id: 'cartData',
  state: () => ({
    cartItems: []
  }),
  actions: {
    addCartItem(cartItem) {
      const itemFinal = {...cartItem, qty: 1}
      this.cartItems = [...this.cartItems, itemFinal]
    },
    changeQty(id, qty) {
      this.cartItems = this.cartItems.map(el => {
        if (el.id == id) {
          return {...el, qty: qty}
        }
        return el
      })
    },
    deleteCartItem(id) {
      console.log('id: ', id);
      this.cartItems = this.cartItems.filter(el => {
        return el.id != id
      })
    },
  }
})
