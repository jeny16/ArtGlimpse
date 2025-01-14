import React, { useState } from 'react';
import { Search, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    Menu,
    MenuItem,
    TextField,
    Typography,
    styled,
    IconButton,
    useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.neutral.light,
    boxShadow: 'none',
    borderBottom: '1px solid #dbd4c7',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.neutral.main,
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#000',
    },
    '&.MuiButtonBase-root': {
        disableRipple: true,
    },
}));


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    // const shopCategories = [
    //     'Pooja Thali',
    //     'Keychains',
    //     'Rakhi',
    //     'Home Decor',
    //     'Indian God Artifacts',
    //     'Jhumkas',
    //     'Lotus Diya',
    // ];

    const renderDesktopMenu = () => (
        <Box display="flex" gap={4} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' }, }}>
            <Link to={"/"}>
                <StyledButton disableRipple disableElevation>Home</StyledButton>
            </Link>
            <Box position="relative">
                <StyledButton
                    onClick={() => navigate('/shop')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}

                    disableRipple
                    disableElevation
                >
                    Shop
                </StyledButton>
            </Box>
            <StyledButton disableRipple disableElevation>About Us</StyledButton>
            <StyledButton onClick={() => navigate('/contact')} disableRipple disableElevation>Contact</StyledButton>
        </Box>
    );

    const renderMobileMenu = () => (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{ display: { xs: 'flex', md: 'none' }, }}
        >
            <Box
                width="250px"
                role="presentation"
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: theme.palette.neutral.light }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box mt={2} display="flex" flexDirection="column" gap={2}>
                    <StyledButton
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                            justifyContent: 'flex-start',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: theme.palette.neutral.main,
                            '&:hover': { color: theme.palette.custom.highlight },
                        }}
                        disableRipple
                        disableElevation
                    >
                        Home
                    </StyledButton>

                    <Box>
                        <StyledButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                color: theme.palette.neutral.main,
                                width: '100%',
                                '&:hover': { color: theme.palette.custom.highlight },
                            }}
                            disableRipple
                            disableElevation
                        >
                            Shop
                        </StyledButton>
                    </Box>

                    <StyledButton
                        sx={{
                            justifyContent: 'flex-start',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: theme.palette.neutral.main,
                            '&:hover': { color: theme.palette.custom.highlight },
                        }}
                        disableRipple
                        disableElevation
                    >
                        About Us
                    </StyledButton>
                    <StyledButton
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                            justifyContent: 'flex-start',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: theme.palette.neutral.main,
                            '&:hover': { color: theme.palette.custom.highlight },
                        }}
                        disableRipple
                        disableElevation
                    >
                        Contact
                    </StyledButton>
                </Box>
            </Box>
        </Drawer>
    );


    return (
        <>
            <StyledAppBar position="fixed">
                <Container>
                    <Box
                        display="flex"
                        alignItems="center"
                        py={3}
                        px={1}
                        justifyContent="space-between"
                    >
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontFamily: 'serif',
                                color: theme.palette.custom.highlight,
                                fontWeight: 'bold',
                            }}
                        >
                            ArtGlimpse
                        </Typography>

                        {renderDesktopMenu()}
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 2,
                                alignItems: 'center'
                            }}
                        >
                            <Box position="relative">
                                <TextField
                                    size="small"
                                    placeholder="Search for products, categories..."
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <Search
                                                size={20}
                                                style={{
                                                    marginRight: 8,
                                                    color: theme.palette.secondary.main,
                                                }}
                                            />
                                        ),
                                        sx: {
                                            paddingInline: '10px',
                                            fontSize: '14px',
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: '50px',
                                        border: '1px solid #dbd4c7',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.primary.dark,
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: theme.palette.custom.highlight,
                                            },
                                        },
                                        '& input::placeholder': {
                                            color: theme.palette.secondary.main,
                                            fontStyle: 'italic',
                                        },
                                    }}
                                />
                            </Box>
                            <Link to="/login">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: theme.palette.custom.highlight,
                                        borderColor: theme.palette.custom.highlight,
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            borderColor: theme.palette.custom.accent,
                                            backgroundColor: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: theme.palette.custom.highlight,
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        color: '#fff',
                                        '&:hover': { backgroundColor: theme.palette.custom.accent },
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </Box>

                        <IconButton
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Container>
            </StyledAppBar>

            {renderMobileMenu()}
            {/* 
            <AuthDialog
                open={authDialog.open}
                onClose={() => setAuthDialog({ ...authDialog, open: false })}
                isLogin={authDialog.isLogin}
            /> */}
        </>
    );
};

export default Header;


