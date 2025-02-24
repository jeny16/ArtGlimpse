import axios from "axios";

const API_URL = "http://localhost:8081/wishlist";

const wishlistService = {
    // Get the wishlist for a given user
    getWishlist: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            console.log("response from getWishlist", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching wishlist", error);
            throw error.response?.data || "Failed to fetch wishlist";
        }
    },

    // Add a product to the wishlist
    addToWishlist: async ({ userId, productId }) => {
        try {
            const response = await axios.post(API_URL, { userId, productId });
            console.log("response from addToWishlist", response.data);
            return response.data;
        } catch (error) {
            console.error("Error adding to wishlist", error);
            throw error.response?.data || "Failed to add to wishlist";
        }
    },

    // Remove a product from the wishlist
    removeFromWishlist: async ({ userId, productId }) => {
        try {
            const response = await axios.delete(`${API_URL}/${userId}/${productId}`);
            console.log("response from removeFromWishlist", response.data);
            return response.data;
        } catch (error) {
            console.error("Error removing from wishlist", error);
            throw error.response?.data || "Failed to remove from wishlist";
        }
    },
};

export default wishlistService;
