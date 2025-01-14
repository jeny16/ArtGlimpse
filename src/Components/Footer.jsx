import { Facebook, Instagram } from "lucide-react";
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
    useTheme,
    useMediaQuery
} from '@mui/material';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const quickLinks = ['Privacy Policy', 'Terms & Conditions', 'FAQ', 'Returns & Refunds'];

    return (
        <Box
            sx={{
                bgcolor: theme.palette.custom.accent,
                color: 'white',
                py: { xs: 6, md: 8 },
                boxShadow: '0 -10px 30px rgba(0,0,0,0.1)'
            }}
        >
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontFamily: 'Raleway, serif',
                                mb: 2,
                                fontWeight: 600,
                                letterSpacing: 1,
                                background: 'linear-gradient(45deg, #FFFFFF 30%, #E0E0E0 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            ArtGlimpse
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                opacity: 0.9,
                                lineHeight: 1.6,
                                fontWeight: 300
                            }}
                        >
                            Crafting memories with resin, one piece at a time.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                            Quick Links
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {quickLinks.map((link) => (
                                <Button
                                    key={link}
                                    sx={{
                                        color: 'white',
                                        justifyContent: 'flex-start',
                                        px: 0,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            opacity: 0.8,
                                            transform: 'translateX(5px)',
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {link}
                                </Button>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                            Contact Us
                        </Typography>
                        <Box sx={{ opacity: 0.9 }}>
                            <Typography
                                variant="body2"
                                paragraph
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 1
                                }}
                            >
                                Email: hello@artglimpse.com
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                Phone: +91 98765 43210
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                            Newsletter
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your email"
                            size="small"
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: 'white',
                                color: theme.palette.custom.highlight,
                                mb: 3,
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.9)',
                                },
                                fontWeight: 500,
                                borderRadius: 2
                            }}
                        >
                            Subscribe
                        </Button>
                        <Box
                            display="flex"
                            gap={2}
                            sx={{
                                justifyContent: isMobile ? 'center' : 'flex-start'
                            }}
                        >
                            <IconButton
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        transform: 'translateY(-3px)',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        transform: 'translateY(-3px)',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Facebook />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        mt: 6,
                        pt: 3,
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        © {new Date().getFullYear()} ArtGlimpse. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;