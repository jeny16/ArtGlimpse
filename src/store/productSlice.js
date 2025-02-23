import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../actions/productService";

// Initial state for products
const initialState = {
    products: [],
    product: null,
    isLoading: false,
    error: null,
};

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, thunkAPI) => {
        try {
            const data = await productService.getProducts();
            console.log("data", data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Async thunk to fetch a single product by id
export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (productId, thunkAPI) => {
        try {
            const data = await productService.getProductById(productId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Async thunk to create a new product
export const createProduct = createAsyncThunk(
    "products/create",
    async (productData, thunkAPI) => {
        try {
            const data = await productService.createProduct(productData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk(
    "products/update",
    async ({ id, productData }, thunkAPI) => {
        try {
            const data = await productService.updateProduct(id, productData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
        try {
            await productService.deleteProduct(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // Optional synchronous reducers can go here
        clearProduct: (state) => {
            state.product = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                console.log("action.payload", action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // fetchProductById
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // createProduct
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // updateProduct
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.map((product) =>
                    product.id === action.payload.id ? action.payload : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // deleteProduct
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
