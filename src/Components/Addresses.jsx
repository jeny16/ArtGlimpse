import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';

const AddressCard = ({ address }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        mb: 3, 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: address.isDefault ? 'custom.highlight' : 'shades.light',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-2px)'
        },
        backgroundColor: address.isDefault ? 'rgba(193, 121, 18, 0.03)' : 'white'
      }}
    >
      {address.isDefault && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 20, 
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'custom.highlight',
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 4,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(193, 121, 18, 0.3)'
          }}
        >
          <StarIcon sx={{ fontSize: 16, mr: 0.5 }} />
          DEFAULT
        </Box>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              mr: 2,
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(193, 121, 18, 0.1)',
              color: 'custom.highlight'
            }}
          >
            <HomeIcon />
          </Box>
          <Typography variant="h6" fontWeight="medium">
            {address.name}
          </Typography>
        </Box>
        <Chip
          label={address.addressType}
          size="small"
          icon={<LocationOnIcon sx={{ fontSize: '16px !important' }} />}
          sx={{
            bgcolor: 'transparent',
            border: '1px solid #d4d4d4',
            borderRadius: 4,
            color: 'text.secondary',
            height: 28,
            fontSize: '0.75rem',
            fontWeight: 'medium'
          }}
        />
      </Box>

      <Box sx={{ ml: 7 }}>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          {address.addressLine1}
        </Typography>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          {address.addressLine2}
        </Typography>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          {address.city} - {address.pincode}
        </Typography>
        {address.state && (
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            {address.state}
          </Typography>
        )}

        {address.mobile && (
          <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
            Mobile: {address.mobile}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', mt: 3, justifyContent: 'flex-end' }}>
        <Tooltip title="Edit Address">
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{
              color: 'custom.highlight',
              borderColor: 'custom.highlight',
              textTransform: 'none',
              fontWeight: 'medium',
              mr: 2,
              borderRadius: 8,
              '&:hover': {
                backgroundColor: 'rgba(193, 121, 18, 0.05)',
                borderColor: 'custom.highlight'
              }
            }}
          >
            Edit
          </Button>
        </Tooltip>

        {!address.isDefault && (
          <Tooltip title="Remove Address">
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={{
                color: 'error.main',
                borderColor: 'error.light',
                textTransform: 'none',
                fontWeight: 'medium',
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: 'error.lightest',
                  borderColor: 'error.main'
                }
              }}
            >
              Remove
            </Button>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
};

const Addresses = ({ addresses }) => {
  const defaultAddress = addresses.find(addr => addr.isDefault);
  const otherAddresses = addresses.filter(addr => !addr.isDefault);

  return (
    <Paper sx={{ 
      p: 0, 
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          px: 4, 
          py: 3,
          backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)',
          borderBottom: '1px solid',
          borderColor: 'shades.light'
        }}
      >
        <Box>
          <Typography 
            variant="h5" 
            component="h2" 
            fontWeight="bold"
            sx={{ color: 'custom.highlight' }}
          >
            My Addresses
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage your delivery locations
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: 'custom.highlight',
            color: 'white',
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(193, 121, 18, 0.3)',
            py: 1,
            px: 3,
            '&:hover': {
              backgroundColor: 'custom.accent',
              boxShadow: '0 6px 16px rgba(193, 121, 18, 0.4)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          Add New Address
        </Button>
      </Box>

      {defaultAddress && (
        <Box sx={{ px: 4, py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <StarIcon sx={{ color: 'custom.highlight', mr: 1 }} />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'custom.highlight'
              }}
            >
              DEFAULT ADDRESS
            </Typography>
          </Box>
          <AddressCard address={defaultAddress} />
        </Box>
      )}

      {otherAddresses.length > 0 && (
        <Box sx={{ px: 4, pt: 2, pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary'
              }}
            >
              OTHER ADDRESSES
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {otherAddresses.map((address) => (
              <Grid item xs={12} key={address.id}>
                <AddressCard address={address} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default Addresses;