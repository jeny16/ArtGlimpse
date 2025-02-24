import React, { memo, useMemo } from 'react';
import { Box, useTheme, Fade } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
    const theme = useTheme();

    const productItems = useMemo(() => {
        return products.map((product, index) => (
            <Fade in={true} timeout={500 + index * 200} key={product.id || index}>
                <Box>
                    <ProductCard product={product} />
                </Box>
            </Fade>
        ));
    }, [products]);

    return (
        <Box
            sx={{
                maxWidth: '1200px',   // maximum width for larger screens
                width: '100%',        // full width on smaller devices
                mx: 'auto',           // centers the grid horizontally
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',  // 2 columns for mobile
                    sm: 'repeat(3, 1fr)',  // 3 columns for tablet
                    md: 'repeat(4, 1fr)'   // 4 columns for laptop and up
                },
                gap: '16px',           // fixed gap between items
            }}
        >
            {productItems}
        </Box>
    );
};

export default memo(ProductGrid);
