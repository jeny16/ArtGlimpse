import React, { memo, useMemo } from 'react';
import { Box, useTheme, Fade } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
    const theme = useTheme();

    const productItems = useMemo(() => {
        return products.map((product, index) => (
            <Fade in={true} timeout={500 + index * 200} key={product.id || index}>
                <Box
                    sx={{
                        flex: '0 1 calc(50% - 16px)',
                        [theme.breakpoints.up('sm')]: { flex: '0 1 calc(33.33% - 16px)' },
                        [theme.breakpoints.up('md')]: { flex: '0 1 calc(25% - 16px)' },
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <ProductCard product={product} />
                </Box>
            </Fade>
        ));
    }, [products, theme]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: { xs: 2, sm: 3, md: 4 }
            }}
        >
            {productItems}
        </Box>
    );
};

export default memo(ProductGrid);
