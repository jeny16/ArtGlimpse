import axios from "axios";
import { Client, Storage } from "appwrite";

// Backend API base URL
const API_URL = "http://localhost:8081/products";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67f225d6001b11e422b8");

const storage = new Storage(client);

// Helper to resolve an image ID or URL to a preview link
export const resolveImage = (imageIdOrUrl) => {
    if (!imageIdOrUrl) return null;
  
    if (imageIdOrUrl.startsWith("http")) {
      console.log("Resolved image URL (already full):", imageIdOrUrl);
      return imageIdOrUrl;
    }
  
    // Use getFileView instead of getFilePreview to avoid transformation issues
    const viewUrl = storage
      .getFileView("67f226020009ef702b5c", imageIdOrUrl)
      .toString();
  
    console.log("Resolved Appwrite image ID to view URL:", {
      imageId: imageIdOrUrl,
      viewUrl,
    });
  
    return viewUrl;
  };
  

// Product service with CRUD and enhanced image handling
const productService = {
  // Fetch all products and resolve image previews
  getProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      const products = response.data;

      console.log("Raw products from backend:", products);

      const enhancedProducts = products.map((product) => {
        const imagePreview =
          product.images?.[0] && resolveImage(product.images[0]);
        const imagePreviews = product.images?.map(resolveImage) || [];

        return {
          ...product,
          imagePreview,
          imagePreviews,
        };
      });

      console.log("Enhanced products with previews:", enhancedProducts);
      return enhancedProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error.response?.data || "Failed to fetch products";
    }
  },

  // Fetch a single product by ID and resolve image previews
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const product = response.data;

      console.log("Fetched product by ID:", product);

      const imagePreview =
        product.images?.[0] && resolveImage(product.images[0]);
      const imagePreviews = product.images?.map(resolveImage) || [];

      const enhancedProduct = {
        ...product,
        imagePreview,
        imagePreviews,
      };

      console.log("Enhanced product with previews:", enhancedProduct);
      return enhancedProduct;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error.response?.data || "Failed to fetch product";
    }
  },

  // Create a new product
  createProduct: async (productData) => {
    try {
      console.log("Creating product with data:", productData);
      const response = await axios.post(API_URL, productData);
      console.log("Created product:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error.response?.data || "Failed to create product";
    }
  },

  // Update an existing product
  updateProduct: async (id, productData) => {
    try {
      console.log("Updating product:", { id, productData });
      const response = await axios.put(`${API_URL}/${id}`, productData);
      console.log("Updated product:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error.response?.data || "Failed to update product";
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    try {
      console.log("Deleting product with ID:", id);
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log("Deleted product response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error.response?.data || "Failed to delete product";
    }
  },
};

export default productService;
