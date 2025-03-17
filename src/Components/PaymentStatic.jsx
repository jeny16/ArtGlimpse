import React from 'react';
import { Box, Typography } from '@mui/material';

const PaymentStatic = () => {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Static Payment</Typography>
            <Typography>
                This is a dummy payment page. Click "Confirm Payment" to simulate payment success.
            </Typography>
        </Box>
    );
};

export default PaymentStatic;
