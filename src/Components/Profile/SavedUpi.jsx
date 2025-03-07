import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Upi = () => {
    return (
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: 'custom.highlight', mb: 2 }}>
                Saved UPI
            </Typography>
            <Typography variant="body1">
                You have no saved UPI IDs.
            </Typography>
        </Paper>
    );
};

export default Upi;
