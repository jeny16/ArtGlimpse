// src/pages/WishlistPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { ProductGrid, Loader, ErrorState, EmptyState } from "../Components/index";
import { fetchWishlist } from "../store/wishlistSlice";

const WishlistPage = () => {
    const dispatch = useDispatch();
    // For demonstration, we're hardcoding a userId.
    // In a real app, you'd get the logged-in user's id from the auth slice or context.
    const userId = "someUserId";

    // Get wishlist state from Redux store
    const { wishlist, isLoading, error } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <ErrorState
                title="Wishlist Error"
                description={error}
                buttonText="Retry"
                onRetry={() => dispatch(fetchWishlist(userId))}
            />
        );
    }

    // Assuming wishlist is an object with a 'products' array
    const products = wishlist?.products || [];

    if (products.length === 0) {
        return (
            <EmptyState
                title="Your wishlist is empty"
                description="Looks like you haven't added any products to your wishlist yet. Start exploring and add your favorite products."
                buttonText="Explore Products"
                redirectTo="/"
            />
        );
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
                Your Wishlist
            </Typography>
            <ProductGrid products={products} />
        </Box>
    );
};

export default WishlistPage;
