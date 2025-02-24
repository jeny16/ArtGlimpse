import React from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';

const Loader = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // adjust height as needed
            }}
        >
            <CircularProgress sx={{ color: theme.palette.custom.highlight }} />
        </Box>
    );
};

export default Loader;
