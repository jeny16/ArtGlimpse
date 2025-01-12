import React, { useState } from 'react';
import {  X, Search, ShoppingCart, User } from 'lucide-react';
import {
    AppBar,
    Box,
    Button,
    Container,
    Menu,
    MenuItem,
    TextField,
    Typography,
    styled
} from '@mui/material';
import AuthDialog from './AuthDialog'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#fff',
    color: '#333'
}));

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [authDialog, setAuthDialog] = useState({ open: false, isLogin: true });
    const shopCategories = ['Pooja Thali', 'Keychains', 'Rakhi', 'Home Decor', 'Indian God Artifacts', 'Jhumkas', 'Lotus Diya'];

    return (
        <>
            <StyledAppBar position="fixed">
                <Container>
                    <Box display="flex" alignItems="center" py={2} justifyContent="space-between">
                        <Typography variant="h5" component="div" sx={{ fontFamily: 'serif', color: '#c17912' }}>
                            ArtGlimpse
                        </Typography>

                        <Box display="flex" gap={4} alignItems="center">
                            <Button color="inherit">Home</Button>
                            <Box>
                                <Button
                                    color="inherit"
                                    // endIcon={<KeyboardArrowDown />}
                                    onClick={(e) => setAnchorEl(e.currentTarget)}
                                >
                                    Shop
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    {shopCategories.map((category) => (
                                        <MenuItem key={category} onClick={() => setAnchorEl(null)}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Button color="inherit">Custom Orders</Button>
                            <Button color="inherit">About Us</Button>
                            <Button color="inherit">Contact</Button>
                        </Box>

                        <Box display="flex" gap={2} alignItems="center">
                            <Box position="relative">
                                <TextField
                                    size="small"
                                    placeholder="Search products..."
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <Search size={20} style={{ marginRight: 8 }} />
                                    }}
                                />
                            </Box>
                            <Button
                                variant="outlined"
                                onClick={() => setAuthDialog({ open: true, isLogin: true })}
                                sx={{ color: '#c17912', borderColor: '#c17912' }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setAuthDialog({ open: true, isLogin: false })}
                                sx={{ bgcolor: '#c17912', '&:hover': { bgcolor: '#a66910' } }}
                            >

                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </StyledAppBar>
            <AuthDialog
                open={authDialog.open}
                onClose={() => setAuthDialog({ ...authDialog, open: false })}
                isLogin={authDialog.isLogin}
            />
        </>
    );
};

export default Header;