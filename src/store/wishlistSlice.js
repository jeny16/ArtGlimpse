// src/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "../actions/wishlistService";

// Initial state for wishlist
const initialState = {
    wishlist: null, // your wishlist object (e.g., { userId, productIds: [] })
    isLoading: false,
    error: null,
};

// Async thunk to fetch a user's wishlist
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (userId, thunkAPI) => {
        try {
            const data = await wishlistService.getWishlist(userId);
            console.log("fetched wishlist", data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Async thunk to add a product to a user's wishlist
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async ({ userId, productId }, thunkAPI) => {
        try {
            const data = await wishlistService.addToWishlist(userId, productId);
            console.log("added to wishlist", data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Async thunk to remove a product from a user's wishlist
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async ({ userId, productId }, thunkAPI) => {
        try {
            const data = await wishlistService.removeFromWishlist(userId, productId);
            console.log("removed from wishlist", data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        // You can add synchronous reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlist = action.payload;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(removeFromWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlist = action.payload;
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default wishlistSlice.reducer;
