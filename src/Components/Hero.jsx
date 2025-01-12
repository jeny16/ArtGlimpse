import React from "react";
import { ArrowRight } from "lucide-react";
import {
    Box,
    Button,
    Container,
    Paper,
    Typography
} from '@mui/material';
const Hero = () => (
    <Paper
        sx={{
            position: 'relative',
            height: '100vh',
            bgcolor: '#fdf6e9',
            display: 'flex',
            alignItems: 'center',
            mt: 8

        }}
    >
        <Container>
            <Box textAlign="center">
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontFamily: 'serif',
                        color: '#814d0b',
                        mb: 3
                    }}
                >
                    Handmade Resin Creations for Every Occasion
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        color: '#814d0b',
                        mb: 4
                    }}
                >
                    Customizable Gifts for Weddings, Birthdays & Events
                </Typography>
                <Box display="flex" gap={2} justifyContent="center">
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ bgcolor: '#c17912', '&:hover': { bgcolor: '#a66910' } }}
                    >
                        Shop Now
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{
                            color: '#c17912',
                            borderColor: '#c17912',
                            '&:hover': { borderColor: '#a66910', color: '#a66910' }
                        }}
                    >
                        Learn More
                    </Button>
                </Box>
            </Box>
        </Container>
    </Paper>
);

export default Hero;
