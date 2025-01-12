import React from 'react';
import {
    Box
} from '@mui/material';
import Header from './Components/Header'
import Hero from './Components/Hero'
import Stats from './Components/Stats'
import FeaturedProducts from './Components/FeaturedProducts'
import About from './Components/About'
import Testimonials from './Components/Testimonials'
import Footer from './Components/Footer'
import Features from './Components/Features'

const HomePage = () => {
    return (
        <Box>
            <Header />
            <Hero />
            <FeaturedProducts />
            <About />
            <Stats />
            <Testimonials />
            <Features />
            <Footer />
        </Box>
    );
};

export default HomePage;