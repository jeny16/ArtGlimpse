import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Paper,
    Avatar,
    IconButton,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ContactsIcon from '@mui/icons-material/Contacts';

const ProfileDetails = ({ userData }) => {
    const profileFields = [
        { label: 'Full Name', value: userData.fullName, icon: <PersonIcon /> },
        { label: 'Mobile Number', value: userData.mobileNumber, icon: <PhoneIcon /> },
        { label: 'Email ID', value: userData.email, icon: <EmailIcon /> },
        { label: 'Gender', value: userData.gender, icon: <WcIcon /> },
        { label: 'Date of Birth', value: userData.dateOfBirth || '- not added -', icon: <CakeIcon /> },
        { label: 'Location', value: userData.location || '- not added -', icon: <LocationOnIcon /> },
        { label: 'Alternate Mobile', value: userData.alternateMobile || '- not added -', icon: <PhoneAndroidIcon /> },
        { label: 'Hint Name', value: userData.hintName || '- not added -', icon: <ContactsIcon /> },
    ];

    return (
        <Paper
            sx={{
                p: 0,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}
        >
            {/* Header section with avatar */}
            <Box
                sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)',
                    position: 'relative',
                    borderBottom: '1px solid',
                    borderColor: 'shades.light'
                }}
            >
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'custom.highlight',
                        boxShadow: '0 4px 12px rgba(193, 121, 18, 0.3)'
                    }}
                >
                    <Typography variant="h4">S</Typography>
                </Avatar>

                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        color: 'custom.highlight',
                        mb: 1
                    }}
                >
                    Profile Details
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Manage your personal information
                </Typography>

                <Tooltip title="Edit Profile" placement="top">
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            bgcolor: 'rgba(193, 121, 18, 0.1)',
                            '&:hover': {
                                bgcolor: 'rgba(193, 121, 18, 0.2)'
                            }
                        }}
                    >
                        <EditIcon sx={{ color: 'custom.highlight' }} />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Profile fields section (no alternating background or hover) */}
            <Box sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    {profileFields.map((field, index) => (
                        <Grid item xs={12} key={index}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    borderRadius: 2,
                                    // Removed backgroundColor for even/odd lines
                                    backgroundColor: 'transparent',
                                    // Removed hover effect
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(193, 121, 18, 0.1)',
                                        color: 'custom.highlight',
                                        mr: 2
                                    }}
                                >
                                    {field.icon}
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mb: 0.5 }}
                                    >
                                        {field.label}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight={field.value !== '- not added -' ? 'medium' : 'regular'}
                                        color={field.value !== '- not added -' ? 'text.primary' : 'text.secondary'}
                                    >
                                        {field.value}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        sx={{
                            backgroundColor: 'custom.highlight',
                            color: 'white',
                            py: 1.5,
                            px: 6,
                            fontWeight: 'bold',
                            borderRadius: 8,
                            boxShadow: '0 4px 12px rgba(193, 121, 18, 0.3)',
                            '&:hover': {
                                backgroundColor: 'custom.accent',
                                boxShadow: '0 6px 16px rgba(193, 121, 18, 0.4)',
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProfileDetails;
