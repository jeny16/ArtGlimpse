import {
    Box,
    Container,
    Grid,
    Typography
} from '@mui/material';
import { Star } from 'lucide-react';

const Features = () => {
    const features = [
        { title: '100% Handmade', description: 'Each piece crafted with care' },
        { title: 'Fully Customizable', description: 'Design your perfect piece' },
        { title: 'Perfect for Gifting', description: 'Unique presents for loved ones' },
        { title: 'Premium Materials', description: 'High-quality resin and accessories' },
        { title: 'Ships Across India', description: 'Nationwide delivery available' }
    ];

    return (
        <Box sx={{ py: 8 }}>
            <Container>
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontFamily: 'serif',
                        color: '#814d0b'
                    }}
                >
                    Why Choose Us
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature) => (
                        <Grid item xs={12} sm={6} md={4} key={feature.title}>
                            <Box textAlign="center">
                                <Star size={40} style={{ color: '#c17912', marginBottom: '1rem' }} />
                                <Typography variant="h6" component="h3" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Features;