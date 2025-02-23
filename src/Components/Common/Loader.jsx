import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // adjust height as needed
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;
