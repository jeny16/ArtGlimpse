import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Define a bounce animation using MUI's keyframes helper
const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const EmptyState = ({
    title = "Your cart is empty",
    description = "Looks like you haven’t added anything to your cart yet. Start shopping now and easily check out when you're ready.",
    buttonText = "SHOP NOW",
    redirectTo = "/",
    IconComponent, // Optional: pass a custom icon component if needed
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(redirectTo);
    };

    return (
        <Box
            sx={{
                p: 6,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}
        >
            {IconComponent ? (
                <IconComponent
                    sx={{
                        fontSize: 52,
                        color: 'grey.400',
                        animation: `${bounceAnimation} 2s infinite`,
                    }}
                />
            ) : (
                <ShoppingCartOutlinedIcon
                    sx={{
                        fontSize: 52,
                        color: 'grey.400',
                        animation: `${bounceAnimation} 2s infinite`,
                    }}
                />
            )}
            <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'grey.700' }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.500', mb: 3, maxWidth: '600px' }}>
                {description}
            </Typography>
            <Button variant="contained" onClick={handleClick}>
                {buttonText}
            </Button>
        </Box>
    );
};

export default EmptyState;
