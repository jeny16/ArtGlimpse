import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setDonationAmount } from '../store/cartSlice';

const DonationSection = () => {
  const dispatch = useDispatch();

  const handleDonation = (amount) => {
    dispatch(setDonationAmount(amount));
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Donate to Make a Difference
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[10, 50, 100, 200].map((amt) => (
            <Button
              key={amt}
              variant="outlined"
              color="secondary"
              onClick={() => handleDonation(amt)}
            >
              ₹{amt}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DonationSection;
