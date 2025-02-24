import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const PriceDetails = () => {
    const cart = useSelector((state) => state.cart.cart) || {};
    const items = cart.items || [];
    const couponCode = cart.couponCode || "";
    const donationAmount = Number(cart.donationAmount) || 0;

    let totalMRP = 0;
    let totalDiscount = 0;
    let shippingCost = 0;

    items.forEach((item) => {
        // Safely convert price and quantity to numbers with fallback of 0
        const itemPrice = Number(item.productData.price) || 0;
        const quantity = Number(item.quantity) || 0;
        const itemTotal = itemPrice * quantity;
        totalMRP += itemTotal;

        const discountPercent = Number(item.discountPercent) || 0;
        if (discountPercent) {
            totalDiscount += (itemPrice * discountPercent * quantity) / 100;
        }

        // Ensure shipping cost is a number
        const itemShipping = Number(item.shippingCost) || 0;
        shippingCost = Math.max(shippingCost, itemShipping);
    });

    let couponDiscount = 0;
    if (couponCode === 'NEWUSER') {
        couponDiscount = totalMRP * 0.1;
    }

    const totalPayable =
        totalMRP - totalDiscount - couponDiscount + shippingCost + donationAmount;

    return (
        <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Price Details
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total MRP</Typography>
                    <Typography variant="body1">₹{totalMRP.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Discount on MRP</Typography>
                    <Typography variant="body1" color="success.main">
                        -₹{totalDiscount.toFixed(2)}
                    </Typography>
                </Box>
                {couponCode && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">
                            Coupon Discount ({couponCode})
                        </Typography>
                        <Typography variant="body1" color="success.main">
                            -₹{couponDiscount.toFixed(2)}
                        </Typography>
                    </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Shipping Cost</Typography>
                    <Typography variant="body1">₹{shippingCost.toFixed(2)}</Typography>
                </Box>
                {donationAmount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Donation</Typography>
                        <Typography variant="body1">₹{donationAmount.toFixed(2)}</Typography>
                    </Box>
                )}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" fontWeight="bold">
                        Total Amount
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        ₹{totalPayable.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PriceDetails;
