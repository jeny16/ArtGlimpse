import React from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import PriceDetails from './PriceDetails';

const CartReview = () => {
    const cart = useSelector((state) => state.cart.cart);
    if (!cart || !cart.items || cart.items.length === 0) {
        return <Typography>Your cart is empty.</Typography>;
    }
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                My Shopping Bag ({cart.items.length} Items)
            </Typography>
            {cart.items.map((item) => (
                <CartItem key={item.productId} item={item} />
            ))}
            <PriceDetails />
        </Box>
    );
};

export default CartReview;
