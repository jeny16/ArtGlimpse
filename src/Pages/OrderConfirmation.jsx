import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    return (
        <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Order Confirmed!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Your order has been placed successfully.
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button variant="contained" onClick={() => navigate('/orders')}>
                    Go to My Orders
                </Button>
            </Box>
        </Container>
    );
};

export default OrderConfirmation;
