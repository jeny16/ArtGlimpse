import { Facebook, Instagram } from "lucide-react";
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
const Footer = () => (
    <Box sx={{ bgcolor: '#814d0b', color: 'white', py: 6 }}>
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" component="div" sx={{ fontFamily: 'serif', mb: 2 }}>
                        ArtGlimpse
                    </Typography>
                    <Typography variant="body2">
                        Crafting memories with resin, one piece at a time.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>Quick Links</Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                        {['Privacy Policy', 'Terms & Conditions', 'FAQ', 'Returns & Refunds'].map((link) => (
                            <Button key={link} sx={{ color: 'white', justifyContent: 'flex-start', px: 0 }}>
                                {link}
                            </Button>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>Contact Us</Typography>
                    <Typography variant="body2" paragraph>
                        Email: hello@artglimpse.com
                    </Typography>
                    <Typography variant="body2">
                        Phone: +91 98765 43210
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>Newsletter</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter your email"
                        sx={{
                            bgcolor: 'white',
                            borderRadius: 1,
                            mb: 2
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: '#c17912',
                            '&:hover': { bgcolor: '#a66910' },
                            mb: 2
                        }}
                    >
                        Subscribe
                    </Button>
                    <Box display="flex" gap={2}>
                        <IconButton sx={{ color: 'white' }}>
                            <Instagram />
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <Facebook />
                        </IconButton>
                        {/* <IconButton sx={{ color: 'white' }}>
                            <Pinterest />
                        </IconButton> */}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

export default Footer;