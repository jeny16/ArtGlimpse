import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import { AddAddressForm, AddressCard } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/profileSlice';

const Addresses = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const addresses = profile?.addresses || [];

  // State for tracking inline edit and global add form.
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Transform form data: map isDefault to default and preserve addressType.
  const transformAddressData = (data) => ({
    ...data,
    default: data.isDefault,
    addressType: data.addressType,
  });

  const handleSaveAddress = async (formData) => {
    const newAddress = transformAddressData(formData);
    let updatedAddresses = [];

    if (editData !== null && editIndex !== null) {
      // Editing mode:
      // If the edited address is marked as default, clear default from all others.
      if (newAddress.default) {
        updatedAddresses = addresses.map((addr, index) =>
          index === editIndex ? newAddress : { ...addr, default: false }
        );
      } else {
        // Otherwise, update only the edited address.
        updatedAddresses = addresses.map((addr, index) =>
          index === editIndex ? newAddress : addr
        );
      }
    } else {
      // Adding mode:
      // If the new address is default, unset default flag on all existing addresses.
      if (newAddress.default) {
        updatedAddresses = addresses.map((addr) => ({ ...addr, default: false }));
      } else {
        updatedAddresses = [...addresses];
      }
      updatedAddresses.push(newAddress);
    }

    const updatedProfileData = { ...profile, addresses: updatedAddresses };
    await dispatch(
      updateProfile({ userId: profile.id, profileData: updatedProfileData })
    );
    // Clear form states.
    setEditIndex(null);
    setEditData(null);
    setShowAddForm(false);
  };

  const handleEditAddress = (address, index) => {
    setEditData(address);
    setEditIndex(index);
    setShowAddForm(false);
  };

  const handleRemoveAddress = async (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    const updatedProfileData = { ...profile, addresses: updatedAddresses };
    await dispatch(
      updateProfile({ userId: profile.id, profileData: updatedProfileData })
    );
    if (index === editIndex) {
      setEditIndex(null);
      setEditData(null);
    }
  };

  // Handler to set an address as default.
  const handleSetDefault = async (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      default: i === index,
    }));
    const updatedProfileData = { ...profile, addresses: updatedAddresses };
    await dispatch(
      updateProfile({ userId: profile.id, profileData: updatedProfileData })
    );
  };

  // Determine indices for default and non-default addresses.
  const defaultIndex = addresses.findIndex((addr) => addr.default === true);
  const otherIndices = addresses.map((addr, index) => ({ addr, index })).filter(({ addr }) => !addr.default);

  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)',
          borderBottom: '1px solid',
          borderColor: 'shades.light',
        }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ color: 'custom.highlight' }}>
          Saved Addresses
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your delivery addresses
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 4 }}>
        {/* Global "Add New Address" Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditIndex(null);
              setEditData(null);
              setShowAddForm(true);
            }}
            sx={{
              backgroundColor: 'custom.highlight',
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: 'medium',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'custom.accent' },
            }}
          >
            Add New Address
          </Button>
        </Box>

        {/* Global Add Address Form */}
        {showAddForm && (
          <Box sx={{ mb: 4 }}>
            <AddAddressForm onSave={handleSaveAddress} onCancel={() => setShowAddForm(false)} />
          </Box>
        )}

        {/* Render Default Address */}
        {defaultIndex !== -1 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: 'custom.highlight' }}>
              <StarIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 1 }} />
              Default Address
            </Typography>
            <AddressCard
              address={addresses[defaultIndex]}
              onEdit={() => handleEditAddress(addresses[defaultIndex], defaultIndex)}
              onRemove={() => handleRemoveAddress(defaultIndex)}
              onSetDefault={() => { }}
            />
            {editIndex === defaultIndex && (
              <Box sx={{ mt: 2, ml: 4 }}>
                <AddAddressForm
                  onSave={handleSaveAddress}
                  onCancel={() => {
                    setEditIndex(null);
                    setEditData(null);
                  }}
                  initialData={editData}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Render Other Addresses */}
        {otherIndices.length > 0 && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
              Other Addresses
            </Typography>
            {otherIndices.map(({ addr, index }) => (
              <Box key={index} sx={{ mb: 4 }}>
                <AddressCard
                  address={addr}
                  onEdit={() => handleEditAddress(addr, index)}
                  onRemove={() => handleRemoveAddress(index)}
                  onSetDefault={() => handleSetDefault(index)}
                />
                {editIndex === index && (
                  <Box sx={{ mt: 2, ml: 4 }}>
                    <AddAddressForm
                      onSave={handleSaveAddress}
                      onCancel={() => {
                        setEditIndex(null);
                        setEditData(null);
                      }}
                      initialData={editData}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Addresses;
