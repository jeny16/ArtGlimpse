import React from 'react';
import { Box, Typography, Paper, Button, Chip, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AddressCard = ({ address, onEdit, onRemove, onSetDefault }) => {
    // Choose icon based on addressType.
    const icon =
        address.addressType && address.addressType.toLowerCase() === 'work'
            ? <BusinessIcon />
            : <HomeIcon />;

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 3,
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: address.default ? 'custom.highlight' : 'shades.light',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    transform: 'translateY(-2px)',
                },
                backgroundColor: address.default ? 'rgba(193, 121, 18, 0.03)' : 'white',
            }}
        >
            {/* Address Type Chip */}
            {address.addressType && (
                <Chip
                    label={address.addressType.toUpperCase()}
                    size="small"
                    icon={<LocationOnIcon sx={{ fontSize: '16px !important' }} />}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'transparent',
                        border: '1px solid #d4d4d4',
                        borderRadius: 4,
                        color: 'text.secondary',
                        height: 28,
                        fontSize: '0.75rem',
                        fontWeight: 'medium',
                    }}
                />
            )}

            {/* Top row: Name and Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
                        color: 'custom.highlight',
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                    {address.name || 'Name Not Provided'}
                </Typography>
            </Box>

            {/* Address details */}
            <Box sx={{ ml: 7, mb: 3 }}>
                {address.street && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {address.street}
                    </Typography>
                )}
                {(address.city || address.zip) && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {address.city} {address.zip ? `- ${address.zip}` : ''}
                    </Typography>
                )}
                {address.state && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {address.state}
                    </Typography>
                )}
                {address.country && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {address.country}
                    </Typography>
                )}
                {address.mobile && (
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        <strong>Mobile:</strong> {address.mobile}
                    </Typography>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Action buttons aligned to right */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                {!address.default && (
                    <Button
                        variant="outlined"
                        onClick={onSetDefault}
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'medium',
                            borderRadius: 2,
                            fontSize: '0.7rem',
                            color: 'custom.highlight',
                            borderColor: 'custom.highlight',
                            '&:hover': {
                                backgroundColor: 'rgba(193, 121, 18, 0.05)',
                                borderColor: 'custom.highlight',
                            },
                        }}
                    >
                        Set as default
                    </Button>
                )}
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={onEdit}
                    sx={{
                        color: 'custom.highlight',
                        borderColor: 'custom.highlight',
                        textTransform: 'uppercase',
                        fontWeight: 'medium',
                        borderRadius: 2,
                        fontSize: '0.7rem',
                        '&:hover': {
                            backgroundColor: 'rgba(193, 121, 18, 0.05)',
                            borderColor: 'custom.highlight',
                        },
                    }}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={onRemove}
                    sx={{
                        color: 'error.main',
                        borderColor: 'error.light',
                        textTransform: 'uppercase',
                        fontWeight: 'medium',
                        borderRadius: 2,
                        fontSize: '0.7rem',
                        '&:hover': {
                            backgroundColor: 'error.lightest',
                            borderColor: 'error.main',
                        },
                    }}
                >
                    Remove
                </Button>
            </Box>
        </Paper>
    );
};

export default AddressCard;
