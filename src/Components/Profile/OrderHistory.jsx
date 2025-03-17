import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/orderSlice';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.order);
    const profile = useSelector((state) => state.profile.profile);

    useEffect(() => {
        if (profile?.id) {
            dispatch(fetchOrders(profile.id));
        }
    }, [dispatch, profile]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom>
                My Orders
            </Typography>
            {status === 'loading' && <Typography>Loading orders...</Typography>}
            {status === 'failed' && <Typography>Error: {error}</Typography>}
            {orders && orders.length === 0 && <Typography>No orders found.</Typography>}
            {orders &&
                orders.map((order, index) => (
                    <Paper key={index} sx={{ p: 3, mb: 2 }}>
                        <Typography variant="subtitle1">Order ID: {order.id}</Typography>
                        <Typography variant="body2">
                            Total Amount: ₹{order.totalAmount.toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                            Payment Status: {order.paymentStatus}
                        </Typography>
                        <Typography variant="body2">
                            Placed On: {new Date(order.createdAt).toLocaleString()}
                        </Typography>
                    </Paper>
                ))}
        </Container>
    );
};

export default OrderHistory;
