import React, { memo } from 'react';
import {
    Box
} from '@mui/material';
import { Hero, FeaturedProducts, Story, Stats, Testimonials, Features } from '../Components/index';

const HomePage = () => {
    return (
        <Box>
            <Hero />
            <FeaturedProducts />
            <Story />
            <Stats />
            <Testimonials />
            <Features />
        </Box>
    );
};

export default memo(HomePage);