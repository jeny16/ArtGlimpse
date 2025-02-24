import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';

const steps = ['BAG', 'ADDRESS', 'PAYMENT'];

const StepperNav = ({ activeStep = 0 }) => {
  return (
    <Box mb={4}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography variant="body1" fontWeight="600">
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperNav;
