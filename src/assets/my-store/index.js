import { reactive } from "vue";
const SHIPPING_PRICE = 0.05;
export const SHIPPING_FEE = SHIPPING_PRICE * 100 + "%";

export const store = reactive({
  state: [
    {
      id: 1,
      title: "item",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ex magni perferendis quae vel?",
      price: 200.99,
      count: 22,
    },
    {
      id: 2,
      title: "item",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ex magni perferendis quae vel?",
      price: 205.78,
      count: 2,
    },
    {
      id: 3,
      title: "item",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ex magni perferendis quae vel?",
      price: 210.22,
      count: 11,
    },
    {
      id: 4,
      title: "item",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ex magni perferendis quae vel?",
      price: 220.34,
      count: 1,
    },
    {
      id: 5,
      title: "item",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ex magni perferendis quae vel?",
      price: 230.56,
      count: 44,
    },
    {
      id: 6,
      title: "item",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ex magni perferendis quae vel?",
      price: 230.56,
      count: 9,
    },
    {
      id: 7,
      title: "item",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ex magni perferendis quae vel?",
      price: 230.56,
      count: 222,
    },
    {
      id: 8,
      title: "item",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ex magni perferendis quae vel?",
      price: 230.56,
      count: 18,
    },
  ],
  cart: [],
});
export const getters = {
  getProducts: () => store.state,
  getCartProducts: () => store.cart,
  getCartTotal: () => {
    const subTotal = store.cart.reduce(
      (acc, el) => acc + el.price * el.count,
      0
    );
    const total = subTotal * (1 + SHIPPING_PRICE);
    return { subTotal: subTotal, total: total };
  },
};
export const mutations = {
  addProductToCart: (item, count) => {
    const itemToCart = JSON.parse(JSON.stringify(item));
    itemToCart.count = parseInt(count);
    if (!store.cart.find((t) => t.id === itemToCart.id)) {
      store.cart.push(itemToCart);
    } else {
      const alreadyAdded = store.cart.find((t) => t.id === itemToCart.id);
      alreadyAdded.count += itemToCart.count;
    }
  },
  updateProductQuantityInCart: (id, newCount) => {
    if (!store.cart.find((t) => t.id === id)) {
      return;
    }
    store.cart.find((t) => t.id === id).count = newCount;
  },
  removeProductFromCart(item) {
    const index = store.cart.findIndex((el) => el.id === item.id);
    store.cart.splice(index, 1);
    console.log("store.cart:", store.cart);
  },
  removeOrderedItemsFromStore: () => {
    store.cart.forEach((item) => {
      store.state.find((t) => t.id === item.id).count -= item.count;
    });
  },
  emptyCart: () => {
    store.cart = [];
    console.log("store.cart:", store.cart);
  },
};
