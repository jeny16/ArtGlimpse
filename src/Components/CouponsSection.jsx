import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { applyCoupon } from '../store/cartSlice';
import { CommonButton } from './index';

const CouponsSection = () => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(coupon));
    setCoupon('');
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Apply Coupons
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            label="Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            fullWidth
          />
          <CommonButton btnText="Apply" onClick={handleApplyCoupon} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CouponsSection;
