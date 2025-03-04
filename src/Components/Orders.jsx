import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Orders = () => {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 1,
        mb: 2
      }}
      elevation={1}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 'bold', color: 'custom.highlight' }}
      >
        My Orders
      </Typography>
      <Box>
        <Typography variant="body1" color="text.secondary">
          You have no orders yet.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Orders;
