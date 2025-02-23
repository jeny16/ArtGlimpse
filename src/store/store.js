import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        wishlist: wishlistSlice,
    },
})

export default store;