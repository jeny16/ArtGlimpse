import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddressCard from './Profile/AddressCard';
import AddAddressForm from './Profile/AddAddressForm';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/profileSlice';

const AddressSelection = ({ selectedAddress, setSelectedAddress }) => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const addresses = profile?.addresses || [];

    const [showAddForm, setShowAddForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState(null);

    // Auto-select default address (or first one if none selected)
    useEffect(() => {
        if (!selectedAddress && addresses.length > 0) {
            const defaultAddress = addresses.find(addr => addr.default);
            setSelectedAddress(defaultAddress || addresses[0]);
        }
    }, [addresses, selectedAddress, setSelectedAddress]);

    // Helper: transform form data to address format
    const transformAddressData = (data) => ({
        ...data,
        default: data.isDefault,
        addressType: data.addressType,
        // Preserve id if editing; otherwise generate a new one
        id: editData ? editData.id : Date.now(),
    });

    const handleSaveAddress = async (formData) => {
        const newAddress = transformAddressData(formData);
        let updatedAddresses = [];

        if (editData !== null && editIndex !== null) {
            // Editing mode: if the new address is default, remove default flag from others
            if (newAddress.default) {
                updatedAddresses = addresses.map((addr, index) =>
                    index === editIndex ? newAddress : { ...addr, default: false }
                );
            } else {
                updatedAddresses = addresses.map((addr, index) =>
                    index === editIndex ? newAddress : addr
                );
            }
        } else {
            // Adding mode: if the new address is default, unset default from existing addresses
            if (newAddress.default) {
                updatedAddresses = addresses.map(addr => ({ ...addr, default: false }));
            } else {
                updatedAddresses = [...addresses];
            }
            updatedAddresses.push(newAddress);
        }

        const updatedProfileData = { ...profile, addresses: updatedAddresses };
        await dispatch(updateProfile({ userId: profile.id, profileData: updatedProfileData }));
        setShowAddForm(false);
        setEditData(null);
        setEditIndex(null);
        setSelectedAddress(newAddress);
    };

    const handleEditAddress = (address, index) => {
        setEditData(address);
        setEditIndex(index);
        setShowAddForm(false);
    };

    const handleRemoveAddress = async (index) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        const updatedProfileData = { ...profile, addresses: updatedAddresses };
        await dispatch(updateProfile({ userId: profile.id, profileData: updatedProfileData }));
        if (index === editIndex) {
            setEditIndex(null);
            setEditData(null);
        }
        // If the removed address was selected, update selection
        if (selectedAddress && addresses[index] && selectedAddress.id === addresses[index].id) {
            setSelectedAddress(updatedAddresses.length ? updatedAddresses[0] : null);
        }
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Select Delivery Address</Typography>

            {/* If there are no addresses, allow adding a new one */}
            {addresses.length === 0 && !showAddForm && (
                <Button variant="contained" onClick={() => setShowAddForm(true)}>
                    Add New Address
                </Button>
            )}

            {/* Global Add Address Form */}
            {showAddForm && (
                <AddAddressForm
                    onSave={handleSaveAddress}
                    onCancel={() => {
                        setShowAddForm(false);
                        setEditIndex(null);
                        setEditData(null);
                    }}
                />
            )}

            {/* List of existing addresses */}
            {addresses.map((addr, index) => (
                <Box key={addr.id || index} sx={{ mb: 2 }}>
                    <AddressCard
                        address={addr}
                        selected={selectedAddress && selectedAddress.id === addr.id}
                        onSelect={() => setSelectedAddress(addr)}
                        onEdit={() => handleEditAddress(addr, index)}
                        onRemove={() => handleRemoveAddress(index)}
                        onSetDefault={() => {
                            // Set the chosen address as default
                            const updatedAddresses = addresses.map((address, i) => ({
                                ...address,
                                default: i === index,
                            }));
                            const updatedProfileData = { ...profile, addresses: updatedAddresses };
                            dispatch(updateProfile({ userId: profile.id, profileData: updatedProfileData }));
                            setSelectedAddress(addr);
                        }}
                    />
                    {/* Inline edit form */}
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
    );
};

export default AddressSelection;
