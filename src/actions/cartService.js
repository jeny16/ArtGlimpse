import axios from 'axios';

const API_URL = 'http://localhost:8081/cart';

const cartService = {
    // Get the cart for a given user
    getCart: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            console.log("response from getCart", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching cart", error);
            throw error.response?.data || "Failed to fetch cart";
        }
    },

    // Add a product to the cart
    addProductToCart: async (cartData) => {
        try {
            const response = await axios.post(API_URL, cartData);
            console.log("response from addProductToCart", response.data);
            return response.data;
        } catch (error) {
            console.error("Error adding product to cart", error);
            throw error.response?.data || "Failed to add product to cart";
        }
    },

    // Update the quantity of a product in the cart
    updateProductQuantity: async (userId, productId, quantity) => {
        try {
            const response = await axios.put(`${API_URL}/${userId}/${productId}`, { quantity });
            console.log("response from updateProductQuantity", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating product quantity", error);
            throw error.response?.data || "Failed to update product quantity";
        }
    },

    // Remove a product from the cart
    removeProductFromCart: async (userId, productId) => {
        try {
            const response = await axios.delete(`${API_URL}/${userId}/${productId}`);
            console.log("response from removeProductFromCart", response.data);
            return response.data;
        } catch (error) {
            console.error("Error removing product from cart", error);
            throw error.response?.data || "Failed to remove product from cart";
        }
    },
};

export default cartService;

