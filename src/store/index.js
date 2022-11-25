import { createStore } from "vuex";

export const store = createStore({
    state(){
        return {
            products: [],
            cart: [],
            SHIPPING_RATE: 0.05,
            SHIPPING_FEE: `5%`,
        }
    },
    getters: {
        getProducts: (state) => state.products,
        getCartProducts: (state) => state.cart,
        getShippingFee: (state) => state.SHIPPING_FEE,
        getProductFromStore: (state) => (product) => {
            return state.products.find(item => item.id === product.id);
        },
        getProductFromStoreByTitle: (state) => (productTitle) => {
            return state.products.find(item => item.title === productTitle);
        },
        getProductFromCart: (state) => (product) => {
            return state.cart.find(item => item.id === product.id)
        },
        getCartTotal: (state) => {
            const subTotal = state.cart.reduce((acc, el) => acc + el.price * el.stock, 0);
            const total = subTotal * (1 + state.SHIPPING_RATE);
            return { subTotal: subTotal, total: total };
        },
    },
    mutations: {
        FILL_STORE: (state, data) => {
            state.products = data
        },
        FILL_CART_LOCALSTORAGE: (state) => {
            if(localStorage.getItem('cartProducts')){
                state.cart = JSON.parse(localStorage['cartProducts'])
            }
        },
        ADD_PRODUCT_TO_CART: (state, { product, quantity }) => {
            if(!quantity){
                return
            }
            const itemToCart = JSON.parse(JSON.stringify(product));
            itemToCart.stock = parseInt(quantity);
            if (!findProductInCart(itemToCart)) {
                state.cart.push(itemToCart);
            } else {
                const alreadyAdded = findProductInCart(itemToCart);
                alreadyAdded.stock += itemToCart.stock;
            }
        },
        UPDATE_QUANTITY_IN_CART: (state, { product, newQuantity }) => {
            if(!newQuantity){
                return
            }
            const cartItem = store.getters.getProductFromCart(product)
            cartItem.stock = newQuantity
        },
        REMOVE_FROM_CART: (state, product) => {
            state.cart = state.cart.filter(item => item.id !== product.id)
        },
        REMOVE_ORDERED_FROM_STORE: (state) => {
            state.cart.forEach(productInCart => {
                const productInStore = findProductInStore(productInCart)
                productInStore.stock -= productInCart.stock
            })
        },
        EMPTY_CART: (state) => state.cart = []
    },
})

// common functions
function findProductInCart(product){
    return store.state.cart.find(item => item.id === product.id);
}
function findProductInStore(product){
    return store.state.products.find(item => item.id === product.id);
}
