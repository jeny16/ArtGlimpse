import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { CommonButton } from './index';

const AddressSection = () => {
  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: 'primary.light',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Deliver to: <strong>Soham Sareriya</strong>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Pincode: 380058
        </Typography>
        <CommonButton btnText="Change Address" />
      </CardContent>
    </Card>
  );
};

export default AddressSection;
