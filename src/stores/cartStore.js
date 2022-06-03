import { defineStore } from 'pinia'

export const useCartStore = defineStore({
  id: 'cartData',
  state: () => ({
    cartItems: []
  }),
  actions: {
    addCartItem(cartItem, colorToBin, sizeToBin) {
      const itemFinal = {...cartItem, qty: 1}
      if (cartItem.type == 'configurable') {
        itemFinal['colorToBin'] = colorToBin ? colorToBin : 'default (red)'
        itemFinal['sizeToBin'] = sizeToBin ? sizeToBin : 'default (M)'
      }
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
