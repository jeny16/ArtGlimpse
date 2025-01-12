import { Heart, Package, Sparkles } from "lucide-react";
import {
    Box,
    Container,
    Grid,
    Typography
} from '@mui/material';

const About = () => (
    <Box sx={{ py: 8, bgcolor: '#fdf6e9' }}>
        <Container>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" sx={{ fontFamily: 'serif', color: '#814d0b', mb: 3 }}>
                        Our Story
                    </Typography>
                    <Typography paragraph>
                        Founded in 2020, ArtGlimpse began as a small workshop crafting personalized resin gifts. Today, we're proud to be one of India's leading artisanal resin crafting studios, serving customers nationwide with our unique, handcrafted creations.
                    </Typography>
                    <Typography paragraph>
                        Our team of skilled artisans combines traditional Indian aesthetics with modern resin art techniques to create pieces that are both beautiful and meaningful. Each item is carefully crafted to preserve the cultural significance while adding a contemporary touch.
                    </Typography>
                    <Box display="flex" gap={3} mt={4}>
                        <Box>
                            <Heart size={32} style={{ color: '#c17912', marginBottom: '8px' }} />
                            <Typography variant="h6">Handcrafted</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Made with love
                            </Typography>
                        </Box>
                        <Box>
                            <Package size={32} style={{ color: '#c17912', marginBottom: '8px' }} />
                            <Typography variant="h6">Custom Orders</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Your vision, our craft
                            </Typography>
                        </Box>
                        <Box>
                            <Sparkles size={32} style={{ color: '#c17912', marginBottom: '8px' }} />
                            <Typography variant="h6">Premium Quality</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Built to last
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src="/api/placeholder/600/400"
                        alt="Workshop"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 2,
                            boxShadow: 3
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    </Box>
);


export default About;