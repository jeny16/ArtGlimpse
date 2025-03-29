import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import {
    PriceDetails,
    PaymentStatic,
    AddressSelection,
    CartReview,
    StepperNav,
    Loader,
    ErrorState,
    EmptyState,
    CommonButton
} from '../Components/index';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../store/orderSlice';
import { clearCart, fetchCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../store/profileSlice';
import { toast } from 'react-toastify';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, status, error } = useSelector((state) => state.cart);
    const profile = useSelector((state) => state.profile.profile);
    const { userData } = useSelector((state) => state.auth);
    const userId = userData?.userId || userData?._id;

    // Checkout steps
    const [activeStep, setActiveStep] = useState(0);
    // Lifted state for selected address (passed into AddressSelection)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const steps = ['Bag', 'Address', 'Payment'];

    useEffect(() => {
        if (userId) {
            dispatch(fetchCart(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userId && !profile) {
            dispatch(fetchProfile({ userId }));
        }
    }, [dispatch, userId, profile]);

    const handleNext = async () => {
        if (activeStep === 0) {
            setActiveStep(1);
        } else if (activeStep === 1) {
            if (!selectedAddress) {
                toast.error('Please select an address');
                return;
            }
            setActiveStep(2);
        } else if (activeStep === 2) {
            const orderData = {
                userId: profile.id,
                cart: cart,
                shippingAddress: selectedAddress,
            };
            try {
                await dispatch(createOrder(orderData)).unwrap();
                dispatch(clearCart());
                navigate('/order-confirmation');
            } catch (err) {
                toast.error('Order creation failed: ' + err);
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const nextLabel =
        activeStep === 0 ? 'Place Order' : activeStep === 1 ? 'Continue' : 'Confirm Payment';

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
            <ErrorState onRetry={() => dispatch(fetchCart(userId))} description={error} />
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
                {/* Main Content */}
                <Grid item xs={12} md={8}>
                    {activeStep === 0 && <CartReview />}
                    {activeStep === 1 && (
                        <AddressSelection
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                        />
                    )}
                    {activeStep === 2 && <PaymentStatic />}
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={4}>
                    <PriceDetails />
                    <Box sx={{ mt: 3, gap: 2, display: 'flex', justifyContent: 'space-between' }}>
                        {activeStep > 0 && (
                            <CommonButton
                                btnText="Back"
                                onClick={handleBack}
                                sx={{
                                    bgcolor: 'transparent',
                                    color: (theme) => theme.palette.custom.highlight,
                                    border: (theme) => `1px solid ${theme.palette.custom.highlight}`,
                                    '&:hover': {
                                        bgcolor: (theme) => theme.palette.custom.accent,
                                        color: '#fff',
                                    },
                                }}
                            />
                        )}
                        <CommonButton
                            btnText={nextLabel}
                            onClick={handleNext}
                            fullWidth={true}
                            sx={{
                                bgcolor: (theme) => theme.palette.custom.highlight,
                                color: '#fff',
                                '&:hover': {
                                    bgcolor: (theme) => theme.palette.custom.accent,
                                },
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CartPage;
