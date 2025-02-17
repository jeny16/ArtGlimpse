import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    useTheme,
    useMediaQuery,
    Fade
} from '@mui/material';
import { ProductCard } from './index';

const FeaturedProducts = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const products = [
        {
            id: 1,
            name: 'Traditional Antique Brass Lotus Pooja Thali Set with Diya and Bell',
            price: '₹1,499 - ₹2,499',
            category: 'POOJA ESSENTIALS',
            image: 'src/assets/image (1).jpg'
        },
        {
            id: 2,
            name: 'Handcrafted Brass Peacock Incense Holder with Intricate Designs',
            price: '₹399 - ₹699',
            category: 'HOME DECOR',
            image: 'src/assets/image (2).jpg'
        },
        {
            id: 3,
            name: 'Vintage Style Brass Ganesha Idol with Traditional Temple Design',
            price: '₹999 - ₹1,999',
            category: 'RELIGIOUS ARTIFACTS',
            image: 'src/assets/image (1).jpg'
        },
        {
            id: 4,
            name: 'Handmade Brass Oil Lamp Set with Decorative Lotus Base (Set of 5)',
            price: '₹799 - ₹1,299',
            category: 'FESTIVAL SPECIALS',
            image: 'src/assets/image (2).jpg'
        }
    ];

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
                    zIndex: 0
                }
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Box
                    sx={{
                        mb: { xs: 6, sm: 6, md: 8 },
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontFamily: theme.typography.h2.fontFamily,
                            color: theme.palette.custom.highlight,
                            fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' },
                            fontWeight: 600,
                            mb: { xs: 3, sm: 2 },
                            position: 'relative',
                            display: 'inline-block',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -12,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: { xs: '80px', sm: '60px' },
                                height: { xs: '4px', sm: '3px' },
                                backgroundColor: theme.palette.custom.highlight,
                                borderRadius: '2px'
                            }
                        }}
                    >
                        Featured Products
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: theme.palette.secondary.main,
                            mt: { xs: 4, sm: 3 },
                            maxWidth: '700px',
                            mx: 'auto',
                            px: { xs: 2, sm: 4, md: 0 },
                            fontSize: { xs: '1rem', sm: '1rem' },
                            lineHeight: { xs: 1.6, sm: 1.5 }
                        }}
                    >
                        Discover our handpicked collection of authentic brass artifacts and traditional items
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={{ xs: 3, sm: 3, md: 4 }}
                    sx={{
                        mt: { xs: 1, sm: 2 }
                    }}
                >
                    {products.map((product, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={product.id}
                        >
                            <Fade
                                in={true}
                                timeout={500 + index * 200}
                            >
                                <Box>
                                    <ProductCard
                                        product={product}
                                    />
                                </Box>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>

                {products.length > 4 && (
                    <Box
                        sx={{
                            textAlign: 'center',
                            mt: { xs: 6, sm: 5, md: 6 }
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.custom.highlight,
                                cursor: 'pointer',
                                fontSize: { xs: '1rem', sm: '0.9rem' },
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            View All Products
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default FeaturedProducts;