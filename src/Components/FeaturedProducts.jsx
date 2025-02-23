import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ProductGrid } from '../Components/index';
import { fetchProducts } from '../store/productSlice';

const FeaturedProducts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.product);

    useEffect(() => {
        // Dispatch the thunk to fetch products
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch]);

    return (
        <Box
            sx={{
                py: { xs: 8, sm: 8, md: 10 },
                px: { xs: 2, sm: 3, md: 0 },
                bgcolor: theme.palette.primary.main,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    zIndex: 0,
                },
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Typography variant="h3" align="center" sx={{ mb: 4, color: theme.palette.custom.highlight }}>
                    Featured Products
                </Typography>
                {isLoading ? (
                    <Typography align="center">Loading...</Typography>
                ) : error ? (
                    <Typography align="center" color="error">
                        {error}
                    </Typography>
                ) : (
                    <ProductGrid products={products} />
                )}
            </Container>
        </Box>
    );
};

export default memo(FeaturedProducts);
