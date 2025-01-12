import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    Avatar
} from '@mui/material';
import { Quote } from 'lucide-react';
const Testimonials = () => {
    const testimonials = [
        {
            name: 'Priya Shah',
            location: 'Mumbai',
            text: 'The custom pooja thali I ordered was absolutely stunning. The attention to detail and the quality of work exceeded my expectations.',
            rating: 5
        },
        {
            name: 'Rahul Verma',
            location: 'Delhi',
            text: 'Ordered a personalized rakhi set for my sisters. The craftmanship was exceptional, and the delivery was right on time.',
            rating: 5
        },
        {
            name: 'Anjali Patel',
            location: 'Bangalore',
            text: 'Beautiful Ganesh idol with amazing detailing. The resin work is flawless, and it looks perfect in my prayer room.',
            rating: 5
        }
    ];

    return (
        <Box sx={{ py: 8, bgcolor: '#fff' }}>
            <Container>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontFamily: 'serif',
                        color: '#814d0b'
                    }}
                >
                    Customer Love
                </Typography>
                <Grid container spacing={4}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Quote size={32} style={{ color: '#c17912', marginBottom: '16px' }} />
                                    <Typography paragraph>{testimonial.text}</Typography>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar sx={{ bgcolor: '#c17912' }}>
                                            {testimonial.name[0]}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {testimonial.location}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
export default Testimonials;