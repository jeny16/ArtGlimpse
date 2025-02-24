import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { ProductGrid } from '../Components/index';
import { fetchProducts } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, isLoading, error } = useSelector((state) => state.product);

    useEffect(() => {
        // Dispatch the thunk to fetch products if not already available
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    // Show only the first 8 products
    const displayedProducts = products.slice(0, 8);

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
                <Typography
                    variant="h3"
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
                    Featured Products
                </Typography>
                {isLoading ? (
                    <Typography align="center">Loading...</Typography>
                ) : error ? (
                    <Typography align="center" color="error">
                        {error}
                    </Typography>
                ) : (
                    <>
                        <ProductGrid products={displayedProducts} />
                        {products.length > 8 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Button
                                    onClick={() => navigate('/shop')}
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
                                >
                                    View More
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
};

export default memo(FeaturedProducts);