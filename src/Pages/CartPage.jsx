import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Box, Typography } from '@mui/material';
import StepperNav from '../Components/StepperNav';
import CartReview from '../Components/CartReview';
import AddressSelection from '../Components/AddressSelection';
import PaymentStatic from '../Components/PaymentStatic';
import { Loader, ErrorState, EmptyState } from '../Components';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../store/orderSlice';
import { clearCart, fetchCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, status, error } = useSelector((state) => state.cart);
    const profile = useSelector((state) => state.profile.profile);
    const { userData } = useSelector((state) => state.auth);
    const userId = userData?.userId || userData?._id;

    const [activeStep, setActiveStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const steps = ['Bag', 'Address', 'Payment'];

    useEffect(() => {
        if (userId) {
            dispatch(fetchCart(userId));
        }
    }, [dispatch, userId]);

    const handleNext = async () => {
        if (activeStep === 0) {
            setActiveStep(1);
        } else if (activeStep === 1) {
            // Ensure an address is selected before moving forward
            if (!selectedAddress) {
                alert('Please select an address');
                return;
            }
            setActiveStep(2);
        } else if (activeStep === 2) {
            // Build order request data
            const orderData = {
                userId: profile.id,
                cart: cart,
                shippingAddress: selectedAddress
            };
            try {
                await dispatch(createOrder(orderData)).unwrap();
                dispatch(clearCart());
                navigate('/order-confirmation');
            } catch (err) {
                alert('Order creation failed: ' + err);
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    if (!userId) {
        return (
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Typography variant="h5" align="center">
                    Please login to view your cart.
                </Typography>
            </Container>
        );
    }

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        return (
            <ErrorState
                onRetry={() => dispatch(fetchCart(userId))}
                description={error}
            />
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <EmptyState
                title="Your cart is empty"
                description="Looks like you haven’t added anything to your cart yet. Start shopping now and easily check out when you're ready."
                buttonText="SHOP NOW"
                redirectTo="/"
                IconComponent={ShoppingCartOutlinedIcon}
            />
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4, mt: 20 }}>
            <StepperNav activeStep={activeStep} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {activeStep === 0 && <CartReview />}
                    {activeStep === 1 && (
                        <AddressSelection
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                        />
                    )}
                    {activeStep === 2 && <PaymentStatic />}
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                {activeStep > 0 && (
                    <Button variant="outlined" onClick={handleBack}>
                        Back
                    </Button>
                )}
                <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Confirm Payment' : 'Next'}
                </Button>
            </Box>
        </Container>
    );
};

export default CartPage;
