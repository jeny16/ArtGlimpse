import React, { useEffect } from 'react';
import {
    Paper,
    Box,
    Typography,
    Grid,
    Chip,
    Rating,
    useTheme
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../store/orderSlice';
import { Loader, EmptyState, ErrorState } from '../index';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { orders, status, error } = useSelector((state) => state.order);
    const profile = useSelector((state) => state.profile.profile);

    useEffect(() => {
        if (profile?.id) {
            dispatch(fetchOrders(profile.id));
        }
    }, [dispatch, profile]);

    const handleRetry = () => {
        if (profile?.id) {
            dispatch(fetchOrders(profile.id));
        }
    };

    const handleCardClick = (orderId) => {
        navigate(`/orders/${orderId}`);
    };

    return (
        <Paper
            sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                mb: 4
            }}
        >
            {/* Header Section - Always visible */}
            <Box
                sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)',
                    borderBottom: '1px solid',
                    borderColor: 'shades.light'
                }}
            >
                <ShoppingCartIcon sx={{ fontSize: 40, color: 'custom.highlight', mb: 1 }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'custom.highlight', mb: 1 }}>
                    My Orders
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Review your order history and track current orders.
                </Typography>
            </Box>

            {/* Content Section */}
            <Box sx={{ p: { xs: 2, sm: 4 } }}>
                {status === 'loading' ? (
                    <Loader width />
                ) : status === 'failed' ? (
                    <ErrorState
                        width
                        title="Error Fetching Orders"
                        description={error}
                        buttonText="Retry"
                        onRetry={handleRetry}
                    />
                ) : orders && orders.length === 0 ? (
                    <EmptyState
                        width
                        title="No Orders Found"
                        description="You haven't placed any orders yet. Explore our shop to place your first order!"
                        buttonText="Shop Now"
                        redirectTo="/shop"
                    />
                ) : (
                    orders?.map((order) => {
                        const orderItems = order.items || [];
                        return (
                            <Paper
                                key={order.id}
                                sx={{
                                    mb: 5,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: 'none',
                                    border: '1px solid #ddd',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleCardClick(order.id)}
                            >
                                {/* Order Header */}
                                <Box sx={{ p: 2, backgroundColor: 'transparent' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Order ID: {order.id}
                                        </Typography>
                                        <Chip
                                            label={order.paymentStatus === 'PAID' ? 'Delivered' : 'Pending'}
                                            color={order.paymentStatus === 'PAID' ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Delivered on{' '}
                                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </Typography>
                                </Box>

                                {/* Order Items */}
                                {orderItems.map((item, idx) => {
                                    const productData = item.productData || {};
                                    const images = productData.images || [];
                                    const productImage = images[0] || '/api/placeholder/120/160';
                                    const productName = productData.name || 'Product Name';
                                    const price = item.price || productData.price || 0;
                                    return (
                                        <Box
                                            key={idx}
                                            sx={{
                                                py: 2,
                                                px: 2,
                                                borderTop: idx === 0 ? '1px solid #ddd' : 'none',
                                                borderBottom: '1px solid #ddd'
                                            }}
                                        >
                                            <Grid container spacing={2}>
                                                {/* Product Image */}
                                                <Grid item xs={3} sm={2}>
                                                    <Box
                                                        component="img"
                                                        src={productImage}
                                                        alt={productName}
                                                        sx={{
                                                            width: { xs: '100px', md: '120px' },
                                                            height: '160px',
                                                            objectFit: 'cover',
                                                            borderRadius: '4px',
                                                            border: `1px solid ${theme.palette.shades.light}`
                                                        }}
                                                    />
                                                </Grid>

                                                {/* Product Details */}
                                                <Grid item xs={9} sm={10}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12} md={7}>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px' }}>
                                                                {productName}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ color: '#333', fontSize: '14px' }}>
                                                                Quantity: {item.quantity || 1}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ color: '#666', fontSize: '12px' }}>
                                                                7 days return available
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={5}
                                                            sx={{
                                                                textAlign: { xs: 'left', md: 'right' },
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' }, mb: 1 }}>
                                                                <Typography sx={{ fontWeight: 600, fontSize: '16px', mr: 1 }}>
                                                                    ₹{price}
                                                                </Typography>
                                                                <Rating name="read-only" value={4} readOnly size="small" sx={{ ml: 1 }} />
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    );
                                })}

                                {/* Order Total */}
                                <Box sx={{ p: 2, backgroundColor: 'transparent' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                                        Total: ₹{order.totalAmount?.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Paper>
                        );
                    })
                )}
            </Box>
        </Paper>
    );
};

export default OrderHistory;
