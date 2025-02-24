import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { ProductGrid, Loader, ErrorState, EmptyState } from "../Components";
import { fetchWishlist } from "../store/wishlistSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const auth = useSelector((state) => state.auth);
    const userId = auth.userData?.userId;

    useEffect(() => {
        if (userId) {
            dispatch(fetchWishlist(userId))
                .unwrap()
                .catch((error) => {
                    toast.error("Failed to load wishlist");
                    console.error("Error fetching wishlist:", error);
                });
        }
    }, [dispatch, userId]);

    const { wishlist, isLoading, error } = useSelector((state) => state.wishlist);
    console.log("wishlist", wishlist);

    // Filter out products that lack essential fields (e.g., name)
    const validProducts = useMemo(() => {
        if (wishlist?.products) {
            return wishlist.products
                .filter(p => {
                    // Handle both direct product objects and nested productId objects
                    const product = p.productId || p;
                    return product && product.name && product.name.trim() !== "";
                })
                .map(p => p.productId || p); // Normalize the product structure
        }
        return [];
    }, [wishlist]);

    if (isLoading) return <Loader />;
    if (error)
        return (
            <ErrorState
                title="Wishlist Error"
                description={error}
                buttonText="Retry"
                onRetry={() => dispatch(fetchWishlist(userId))}
            />
        );

    if (validProducts.length === 0)
        return (
            <EmptyState
                title="Your wishlist is empty"
                description="Looks like you haven't added any products to your wishlist yet. Start exploring and add your favorite products."
                buttonText="Explore Products"
                onClick={() => navigate("/")}
            />
        );

    return (
        <Container maxWidth="lg" sx={{ pt: 24, pb: 10 }}>
            <Typography variant="h3"
                component="h2"
                sx={{
                    textAlign: "center",
                    mb: { xs: 4, sm: 5, md: 6 },
                    color: "#814d0b",
                    fontWeight: 650,
                    fontSize: {
                        xs: '1.8rem',
                        sm: '2.2rem',
                        md: '2.5rem',
                        lg: '3rem'
                    }
                }}
            >
                Your Wishlist
            </Typography>
            <ProductGrid products={validProducts} />
            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Button
                    sx={{
                        backgroundColor: 'transparent',
                        color: theme.palette.custom.highlight,
                        border: `2px solid ${theme.palette.custom.highlight}`,
                        textTransform: 'none',
                        fontSize: '1rem',
                        px: 3,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: theme.palette.custom.highlight,
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.custom.highlight,
                        },
                    }}
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default WishlistPage;
