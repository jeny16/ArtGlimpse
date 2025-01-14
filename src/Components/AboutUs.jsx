import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    useTheme,
    Paper,
    useMediaQuery
} from '@mui/material';
import HandmadeIcon from '@mui/icons-material/Handyman';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Replaced EcoIcon
import FavoriteIcon from '@mui/icons-material/Favorite';

const AboutUs = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const features = [
        {
            icon: <HandmadeIcon sx={{ fontSize: isMobile ? 32 : 40, color: theme.palette.custom.highlight }} />,
            title: 'Handcrafted with Love',
            description: 'Each piece is carefully crafted by skilled artisans, bringing traditional techniques to modern designs.'
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: isMobile ? 32 : 40, color: theme.palette.custom.highlight }} />,
            title: 'Pan India Delivery',
            description: 'We deliver our handcrafted treasures across India, bringing artisanal beauty to your doorstep.'
        },
        {
            icon: <AutoAwesomeIcon sx={{ fontSize: isMobile ? 32 : 40, color: theme.palette.custom.highlight }} />,
            title: 'Eco-Friendly Materials',
            description: 'We prioritize sustainable materials like resin and wool, ensuring our crafts are kind to the environment.'
        },
        {
            icon: <FavoriteIcon sx={{ fontSize: isMobile ? 32 : 40, color: theme.palette.custom.highlight }} />,
            title: 'Made with Passion',
            description: 'Our homegrown business combines tradition with innovation across 25+ categories of authentic Indian handicrafts.'
        }
    ];

    return (
        <Box sx={{
            bgcolor: theme.palette.primary.main,
            minHeight: '100vh',
            py: 22
        }}>
            <Container maxWidth="lg">
                <Box textAlign="center" mb={{ xs: 4, sm: 6, md: 8 }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            color: theme.palette.custom.highlight,
                            mb: 3,
                            fontSize: {
                                xs: '2rem',
                                sm: '2.5rem',
                                md: '3rem'
                            }
                        }}
                    >
                        Our Story
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: theme.palette.neutral.main,
                            maxWidth: '800px',
                            mx: 'auto',
                            mb: 4,
                            fontSize: {
                                xs: '1.2rem',
                                sm: '1.4rem',
                                md: '1.5rem'
                            },
                            px: { xs: 2, sm: 0 }
                        }}
                    >
                        Bringing India's Rich Handicraft Heritage to Your Home
                    </Typography>
                    <Divider sx={{
                        width: { xs: '40px', sm: '50px', md: '60px' },
                        margin: 'auto',
                        borderColor: theme.palette.custom.highlight,
                        borderWidth: { xs: 1.5, md: 2 }
                    }} />
                </Box>

                {/* Main Content */}
                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: theme.palette.tints.tint1,
                        p: { xs: 2, sm: 3, md: 4 },
                        mb: { xs: 4, sm: 6, md: 8 },
                        borderRadius: 2
                    }}
                >
                    <Typography
                        variant="body1"
                        paragraph
                        sx={{
                            color: theme.palette.neutral.main,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            textAlign: "justify"
                        }}
                    >
                        Welcome to our homegrown handicraft haven, where tradition meets creativity. Starting as a small family venture, we've grown into a vibrant marketplace celebrating India's rich artistic heritage through contemporary expressions. Our collection spans over 25 categories, from sacred Pooja Thalis to trendy Jumakas, each piece telling a unique story of craftsmanship.
                    </Typography>
                    <Typography
                        variant="body1"
                        paragraph
                        sx={{
                            color: theme.palette.neutral.main,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            textAlign: "justify"
                        }}
                    >
                        Our artisans specialize in creating beautiful pieces using both traditional and modern materials like resin and wool. Whether it's festive Rakhis, decorative Diyas, or elegant home décor, each item is crafted with attention to detail and cultural significance. We take pride in offering authentic Indian artifacts while incorporating contemporary design elements to suit modern homes.
                    </Typography>
                </Paper>

                {/* Features Grid */}
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    bgcolor: theme.palette.tints.tint2,
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: isTablet ? 'none' : 'translateY(-5px)'
                                    }
                                }}
                            >
                                <CardContent sx={{
                                    textAlign: 'center',
                                    p: { xs: 2, sm: 2.5, md: 5 }
                                }}>
                                    <Box mb={{ xs: 1, sm: 1.5, md: 2 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            mb: { xs: 1, sm: 1.5, md: 2 },
                                            color: theme.palette.neutral.main,
                                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.neutral.light,
                                            fontSize: { xs: '0.875rem', sm: '0.9rem' }
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutUs;