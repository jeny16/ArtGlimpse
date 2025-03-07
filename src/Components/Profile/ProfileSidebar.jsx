import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Avatar,
    Paper,
    Divider
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import StarsIcon from '@mui/icons-material/Stars';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DeleteIcon from '@mui/icons-material/Delete';
import AppsIcon from '@mui/icons-material/Apps';

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
    // Helper function to map section IDs to icons
    const getIcon = (id) => {
        switch (id) {
            case 'overview':
                return <AppsIcon />;
            case 'orders':
                return <ShoppingBagIcon />;
            case 'coupons':
                return <LocalOfferIcon />;
            case 'credit':
                return <AccountBalanceWalletIcon />;
            case 'profile':
                return <PersonIcon />;
            case 'cards':
                return <CreditCardIcon />;
            case 'upi':
            case 'wallets':
                return <PaymentIcon />;
            case 'addresses':
                return <HomeIcon />;
            case 'delete':
                return <DeleteIcon />;
            case 'terms':
                return <GavelIcon />;
            case 'privacy':
                return <PrivacyTipIcon />;
            default:
                return <PersonIcon />;
        }
    };

    // Sidebar configuration
    const sidebarSections = [
        {
            title: '',
            items: [{ label: 'Overview', id: 'overview' }]
        },
        {
            title: 'ORDERS',
            items: [{ label: 'Orders & Returns', id: 'orders' }]
        },
        {
            title: 'CREDITS',
            items: [{ label: 'Coupons', id: 'coupons' }]
        },
        {
            title: 'ACCOUNT',
            items: [
                { label: 'Profile', id: 'profile' },
                { label: 'Saved Cards', id: 'cards' },
                { label: 'Saved UPI', id: 'upi' },
                { label: 'Addresses', id: 'addresses' },
                { label: 'Delete Account', id: 'delete' }
            ]
        },
        {
            title: 'LEGAL',
            items: [
                { label: 'Terms of Use', id: 'terms' },
                { label: 'Privacy Policy', id: 'privacy' }
            ]
        }
    ];

    return (
        <Paper
            elevation={1} // Lowered elevation for a lighter shadow
            sx={{
                overflow: 'hidden',
                borderRadius: 2,
                transition: 'box-shadow 0.3s ease'
            }}
        >
            {/* Top user info section */}
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'shades.light',
                    // Removed strong gradient in favor of a subtle background
                    backgroundColor: 'rgba(193, 121, 18, 0.05)'
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: 'custom.highlight',
                        width: 56,
                        height: 56,
                        mr: 2,
                        // Removed hover scale transform
                        boxShadow: '0 3px 6px rgba(193, 121, 18, 0.25)',
                        border: '2px solid white'
                    }}
                >
                    S
                </Avatar>
                <Box>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                            color: 'custom.accent',
                            mb: 0.5
                        }}
                    >
                        Soham Sareriya
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        sohamsk2425@gmail.com
                    </Typography>
                </Box>
            </Box>

            {/* Sidebar sections */}
            {sidebarSections.map((section, sIndex) => (
                <Box key={`section-${sIndex}`}>
                    {/* Section title */}
                    {section.title && (
                        <Box
                            sx={{
                                px: 3,
                                py: 1.5,
                                backgroundColor: 'rgba(193, 121, 18, 0.04)',
                                borderTop: sIndex > 0 ? '1px solid' : 'none',
                                borderBottom: '1px solid',
                                borderColor: 'rgba(193, 121, 18, 0.1)'
                            }}
                        >
                            <Typography
                                variant="caption"
                                fontWeight="bold"
                                sx={{
                                    color: 'text.secondary',
                                    letterSpacing: '1px',
                                    fontSize: '0.7rem'
                                }}
                            >
                                {section.title}
                            </Typography>
                        </Box>
                    )}

                    {/* Section items */}
                    <List disablePadding>
                        {section.items.map((item) => {
                            const isActive = activeSection === item.id;

                            return (
                                <ListItem key={item.id} disablePadding>
                                    <ListItemButton
                                        sx={{
                                            px: 3,
                                            py: 1.8,
                                            color: isActive ? 'custom.highlight' : 'text.primary',
                                            // Subtle highlight for active item
                                            backgroundColor: isActive
                                                ? 'rgba(193, 121, 18, 0.08)'
                                                : 'transparent',
                                            '&:hover': {
                                                backgroundColor: isActive
                                                    ? 'rgba(193, 121, 18, 0.12)'
                                                    : 'rgba(193, 121, 18, 0.04)'
                                            },
                                            borderLeft: '4px solid',
                                            borderColor: isActive ? 'custom.highlight' : 'transparent',
                                            transition: 'all 0.2s ease',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onClick={() => setActiveSection(item.id)}
                                    >
                                        <Box
                                            sx={{
                                                mr: 2,
                                                color: isActive ? 'custom.highlight' : 'text.secondary',
                                                display: 'flex',
                                                alignItems: 'center'
                                                // Removed icon scale transform
                                            }}
                                        >
                                            {getIcon(item.id)}
                                        </Box>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontWeight: isActive ? 'bold' : 'medium',
                                                color: isActive ? 'custom.highlight' : 'inherit',
                                                fontSize: '0.95rem'
                                            }}
                                        />
                                        {/* Optional small dot indicator for active item */}
                                        {isActive && (
                                            <Box
                                                sx={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'custom.highlight',
                                                    ml: 1
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                    {/* Divider if needed between sections with no title */}
                    {sIndex < sidebarSections.length - 1 && !section.title && (
                        <Divider sx={{ borderColor: 'rgba(193, 121, 18, 0.08)' }} />
                    )}
                </Box>
            ))}
        </Paper>
    );
};

export default ProfileSidebar;
