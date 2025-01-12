import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography
} from '@mui/material';


const Stats = () => {
    const stats = [
        { number: '5000+', label: 'Happy Customers' },
        { number: '1000+', label: 'Custom Designs' },
        { number: '50+', label: 'Product Categories' },
        { number: '4.8/5', label: 'Average Rating' }
    ];

    return (
        <Box sx={{ py: 6, bgcolor: '#fff' }}>
            <Container>
                <Grid container spacing={4}>
                    {stats.map((stat) => (
                        <Grid item xs={6} md={3} key={stat.label}>
                            <Box textAlign="center">
                                <Typography
                                    variant="h3"
                                    sx={{ color: '#c17912', fontWeight: 'bold', mb: 1 }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Stats;