import React from 'react';
import {
    Box
} from '@mui/material';
import { Hero, FeaturedProducts, About, Stats, Testimonials, Features } from '../Components/index';

const HomePage = () => {
    return (
        <Box>
            <Hero />
            <FeaturedProducts />
            <About />
            <Stats />
            <Testimonials />
            <Features />
        </Box>
    );
};

export default HomePage;