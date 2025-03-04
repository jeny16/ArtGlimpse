import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  ThemeProvider,
  CssBaseline,
  Paper
} from '@mui/material';
import ProfileSidebar from '../Components/ProfileSidebar';
import ProfileDetails from '../Components/ProfileDetails';
import Addresses from '../Components/Addresses';
import Orders from '../Components/Orders';
import theme from '../Styles/theme';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const userData = {
    fullName: 'Soham Sareriya',
    mobileNumber: '8128781512',
    email: 'sohamsk2425@gmail.com',
    gender: 'MALE',
    dateOfBirth: '',
    location: '',
    alternateMobile: '',
    hintName: '',
  };

  const addressData = [
    {
      id: 1,
      name: 'Soham Sareriya',
      addressLine1: 'Indus University,Rancharda,gruh garden road',
      addressLine2: 'Palodia',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380058',
      mobile: '8128781512',
      addressType: 'HOME',
      isDefault: true
    },
    {
      id: 2,
      name: 'Soham Sareriya',
      addressLine1: 'B2-JEEVANDEEP SOCIETY,NR.PALLA...',
      addressLine2: 'Thaltej',
      city: 'Ahmedabad',
      state: '',
      pincode: '380054',
      mobile: '',
      addressType: 'HOME',
      isDefault: false
    },
    {
      id: 3,
      name: 'Soham Sareriya',
      addressLine1: 'Indus University,Gruh Gardens ...',
      addressLine2: 'Rancharada',
      city: 'Ahmedabad',
      state: '',
      pincode: '382115',
      mobile: '',
      addressType: 'HOME',
      isDefault: false
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileDetails userData={userData} />;
      case 'addresses':
        return <Addresses addresses={addressData} />;
      case 'orders':
        return <Orders userData={userData} />;
      default:
        return <ProfileDetails userData={userData} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 5, my: 20 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #fdf7ed 0%, #fefaf4 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid',
            borderColor: 'custom.highlight',
            transition: 'all 0.3s ease'
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            sx={{
              color: 'custom.highlight',
              mb: 1,
              fontFamily: 'Raleway, sans-serif',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 40,
                height: 3,
                backgroundColor: 'custom.highlight',
                borderRadius: 4
              }
            }}
          >
            My Account
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              mt: 2
            }}
          >
            Welcome back, Soham
          </Typography>
        </Paper>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4
        }}>
          <Box sx={{
            width: { xs: '100%', md: '280px' },
            flexShrink: 0
          }}>
            <ProfileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          </Box>

          <Box sx={{
            flexGrow: 1,
            width: { xs: '100%', md: 'calc(100% - 320px)' }
          }}>
            {renderContent()}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;