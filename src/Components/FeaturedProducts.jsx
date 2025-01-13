import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography
} from '@mui/material';
const FeaturedProducts = () => {
    const products = [
        { id: 1, name: 'Lotus Pooja Thali', price: '₹1,499 - ₹2,499', image: 'src/assets/Screenshot 2025-01-12 144710.png' },
        { id: 2, name: 'Custom Resin Rakhi', price: '₹399 - ₹699', image: 'src/assets/Screenshot 2025-01-12 144710.png' },
        { id: 3, name: 'Ganesh Ji Artifact', price: '₹999 - ₹1,999', image: 'src/assets/Screenshot 2025-01-12 144710.png' },
        { id: 4, name: 'Decorative Diya Set', price: '₹799 - ₹1,299', image: 'src/assets/Screenshot 2025-01-12 144710.png' }
    ];

    return (
        <Box sx={{ py: 8, bgcolor: '#fff8ef' }}>
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
                    Featured Products
                </Typography>
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="h3">
                                        {product.name}
                                    </Typography>
                                    <Typography color="primary">
                                        {product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ bgcolor: '#c17912', '&:hover': { bgcolor: '#a66910' } }}
                                    >
                                        Customize Now
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
export default FeaturedProducts;