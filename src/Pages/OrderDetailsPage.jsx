import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Divider,
    Button,
    Grid,
    Chip,
    Rating,
    useTheme
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../store/orderSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, status } = useSelector((state) => state.order);
    const [order, setOrder] = useState(null);

    const theme = useTheme(); // If you have a theme store; otherwise useTheme()

    // On mount, ensure orders are loaded or fetch them
    useEffect(() => {
        dispatch(fetchOrders(/* userId if needed */));
    }, [dispatch]);

    // Once orders are in store, pick the one matching orderId
    useEffect(() => {
        if (orders && orders.length > 0) {
            const found = orders.find((o) => o.id === orderId);
            setOrder(found || null);
        }
    }, [orders, orderId]);

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (status === 'loading') {
        return (
            <Container>
                <Typography>Loading order details...</Typography>
            </Container>
        );
    }

    if (!order) {
        return (
            <Container>
                <Typography>No order found for ID: {orderId}</Typography>
            </Container>
        );
    }

    // Example: derive a "deliveryDate" or use actual data if available
    const deliveryDate = 'Monday, 10 June 2014';

    return (
        <Container sx={{ py: 24 }}>
            {/* Top bar with "Back to Orders" and "Need help?" */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                }}
            >
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/profile')}
                    sx={{
                        textTransform: 'none',
                        color: theme.palette.custom.highlight
                    }}
                >
                    Back to Orders
                </Button>
                <Button
                    variant="text"
                    onClick={() => alert('Help clicked')}
                    sx={{
                        textTransform: 'none',
                        color: theme.palette.custom.highlight
                    }}
                >
                    Need help?
                </Button>
            </Box>

            <Paper variant="outlined" sx={{ p: 3 }}>
                {/* Order ID and placed date */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Order ID: {order.id} ({order.items?.length} item
                        {order.items?.length !== 1 ? 's' : ''})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Placed on: {formatDate(order.createdAt)}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Delivery status and recipient details */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                        Delivered
                        <Chip
                            label="Delivered"
                            color="success"
                            size="small"
                            sx={{ ml: 1, verticalAlign: 'middle' }}
                        />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Delivered on {deliveryDate}
                    </Typography>
                    {order.shippingAddress && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Recipient:</strong> {order.shippingAddress.name}
                        </Typography>
                    )}
                </Box>

                <Grid container spacing={2}>
                    {/* Main section */}
                    <Grid item xs={12} md={8}>
                        {order.items?.map((item, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: 'flex',
                                    mb: 2,
                                    p: 2,
                                    border: '1px solid #ddd',
                                    borderRadius: 2,
                                }}
                            >
                                {/* Product image using CartItem style */}
                                <Box
                                    component="img"
                                    src={item.productData?.images?.[0] || '/api/placeholder/120/160'}
                                    alt={item.productData?.name || 'Product'}
                                    sx={{
                                        width: { xs: '100px', md: '120px' },
                                        height: '160px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        mr: 2,
                                    }}
                                />
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        {item.productData?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ₹{item.price.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Quantity: {item.quantity}
                                    </Typography>

                                    {/* Replacing "Rate This Product" text with star rating */}
                                    <Box sx={{ mt: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.custom.highlight,
                                                mb: 0.5
                                            }}
                                        >
                                            Rate This Product
                                        </Typography>
                                        <Rating
                                            name={`rate-product-${idx}`}
                                            value={0}
                                            onChange={() => alert('Thanks for rating!')}
                                            sx={{
                                                color: theme.palette.custom.highlight,
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        ))}

                        {/* Shipping address details */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Shipping Address
                            </Typography>
                            {order.shippingAddress ? (
                                <Box sx={{ ml: 1 }}>
                                    <Typography variant="body2">
                                        {order.shippingAddress.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {order.shippingAddress.street}
                                    </Typography>
                                    <Typography variant="body2">
                                        {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                                        {order.shippingAddress.zip}
                                    </Typography>
                                    <Typography variant="body2">
                                        {order.shippingAddress.country}
                                    </Typography>
                                    <Typography variant="body2">
                                        Mobile: {order.shippingAddress.mobile}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="body2">No address found.</Typography>
                            )}
                        </Box>
                    </Grid>

                    {/* Right sidebar with Payment details */}
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                border: '1px solid #ddd',
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Order Payment Details
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Order Amount</Typography>
                                <Typography variant="body2">
                                    ₹{order.totalAmount.toFixed(2)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Shipping</Typography>
                                <Typography variant="body2">₹0.00</Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" fontWeight="bold">
                                    Total
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    ₹{order.totalAmount.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                border: '1px solid #ddd',
                                borderRadius: 2,
                                p: 2,
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Payment Method
                            </Typography>
                            <Typography variant="body2">UPI</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Txn Ref: #123456789
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default OrderDetailsPage;
