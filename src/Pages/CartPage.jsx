import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/cartSlice';
import {
    PriceDetails,
    Loader,
    EmptyState,
    ErrorState,
    AddressSection,
    CouponsSection,
    CartItem,
    StepperNav,
    DonationSection,
    CommonButton,
} from '../Components/index';

const CartPage = () => {
    const dispatch = useDispatch();
    const { cart, status, error } = useSelector((state) => state.cart);
    const { userData } = useSelector((state) => state.auth);
    const userId = userData?.userId || userData?._id;

    useEffect(() => {
        if (userId) {
            dispatch(fetchCart(userId));
        }
    }, [dispatch, userId]);

    const handleRetry = () => {
        if (userId) {
            dispatch(fetchCart(userId));
        }
    };

    const errorMessage =
        error && typeof error === 'object'
            ? error.message || JSON.stringify(error)
            : error;

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
        return <ErrorState onRetry={handleRetry} description={errorMessage} />;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return <EmptyState />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4, mt: 20 }}>
            <StepperNav activeStep={0} />
            <AddressSection />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" mb={2} fontWeight="bold">
                        My Shopping Bag ({cart.items.length}{' '}
                        {cart.items.length === 1 ? 'Item' : 'Items'})
                    </Typography>
                    {cart.items.map((item) => (
                        <CartItem key={item.productId} item={item} />
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
                    <CouponsSection />
                    <DonationSection />
                    <PriceDetails />
                    <CommonButton
                        variant="contained"
                        btnText="Place Order"
                        fullWidth={true}
                        mt={3}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CartPage;
