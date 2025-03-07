import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { ProfileSidebar, ProfileDetails, Addresses, Orders, Coupons, SavedCards, SavedUpi, DeleteAccount, Terms, Privacy } from '../Components/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/profileSlice';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(state => state.profile);
  const auth = useSelector(state => state.auth);
  const userId = auth.userData?.userId || auth.userData?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile({ userId }));
    }
  }, [dispatch, userId]);

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileDetails userData={profile} />;
      case 'addresses':
        return <Addresses />;
      case 'orders':
        return <Orders orders={profile?.orders || []} />;
      case 'coupons':
        return <Coupons />;
      case 'cards':
        return <SavedCards />;
      case 'upi':
        return <SavedUpi />;
      case 'delete':
        return <DeleteAccount />;
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
      default:
        return <ProfileDetails userData={profile} />;
    }
  };

  if (!userId) {
    return (
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h5" align="center">
          Please login to view your profile.
        </Typography>
      </Container>
    );
  }

  return (
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
          {profile?.username ? `Welcome back, ${profile.username}` : 'Welcome back'}
        </Typography>
      </Paper>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        null
      ) : (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
            <ProfileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          </Box>
          <Box sx={{ flexGrow: 1, width: { xs: '100%', md: 'calc(100% - 320px)' } }}>
            {renderContent()}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ProfilePage;