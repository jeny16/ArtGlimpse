import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        wishlist: wishlistSlice,
        cart: cartSlice,
    },
})

export default store;