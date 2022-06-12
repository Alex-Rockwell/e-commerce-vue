import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cartData",
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addCartItem(productItem, colorToCart, sizeToCart) {
      ////////////////////// Check if item is in the cart /////////////////////////
      if (
        this.cartItems.some((el) => el.id == productItem.id) &&
        productItem.type != "configurable"
      ) {
        this.cartItems.map((el) => {
          if (el.id == productItem.id) {
            return { ...el, qty: el.qty++ };
          } else {
            return el;
          }
        });
        return;
      }

      ////////////////////// Standart case /////////////////////////////////////////
      const itemFinal = { ...productItem, qty: 1 };

      ////////////////////// Configurable case /////////////////////////////////////////
      if (productItem.type == "configurable") {
        itemFinal["colorToCart"] = colorToCart;
        itemFinal["sizeToCart"] = sizeToCart;
      }
      this.cartItems = [...this.cartItems, itemFinal];
    },
    changeQty(id, qty) {
      this.cartItems = this.cartItems.map((el) => {
        if (el.id == id) {
          return { ...el, qty: qty };
        }
        return el;
      });
    },
    deleteCartItem(id) {
      console.log("id: ", id);
      this.cartItems = this.cartItems.filter((el) => {
        return el.id != id;
      });
    },
  },
});
