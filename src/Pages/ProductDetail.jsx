import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/productSlice';
import {
  Box,
  Container,
  Grid,
  Typography,
  CardMedia,
  Chip,
  Rating,
  CircularProgress,
  Button,
  Paper,
  Stack,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
}));

const ProductDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, isLoading, error } = useSelector(state => state.product);
  
  // For Tabs (if you want to add multiple tabs later)
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);
  
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h5" color="error">Error: {error}</Typography>
        <Button variant="contained" onClick={() => navigate('/products')} sx={{ mt: 2 }}>
          Return to Products
        </Button>
      </Box>
    );
  }
  
  if (!product) return null;
  
  // Use fallback logic in case keys differ
  const price = product.price || 0;
  const discountActive = product.discount;
  const discountPercent = product.percentage_Discount || 0;
  const discountedPrice = discountActive ? price - (price * discountPercent / 100) : price;
  const images = product.images || [];
  const productImage = images.length > 0 ? images[0] : 'https://via.placeholder.com/500';
  
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8, py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Header */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {product.categories}
          </Typography>
          <Typography variant="h3" component="h1" fontWeight="bold">
            {product.name}
          </Typography>
        </Grid>
        
        {/* Left Column: Image */}
        <Grid item xs={12} md={6}>
          <ImageWrapper>
            <CardMedia
              component="img"
              height="500"
              image={productImage}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
            {discountActive && (
              <DiscountChip label={`${discountPercent}% OFF`} />
            )}
          </ImageWrapper>
        </Grid>
        
        {/* Right Column: Details */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* Price & Rating */}
            <Box>
              <Typography variant="h4" color="secondary" fontWeight="bold">
                {product.currency} {discountedPrice.toFixed(2)}
              </Typography>
              {discountActive && (
                <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {product.currency} {price}
                </Typography>
              )}
              <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                <Rating value={product.seller?.rating || 0} precision={0.1} readOnly />
                <Typography variant="body1">
                  ({product.seller?.rating || 'N/A'})
                </Typography>
                {product.seller && (
                  <Chip 
                    icon={<VerifiedIcon />} 
                    label="Verified Seller" 
                    color="primary" 
                    size="small" 
                    variant="outlined" 
                  />
                )}
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body1" color="text.secondary">
                  {product.seller?.location || 'No location info'}
                </Typography>
              </Stack>
            </Box>
            
            {/* Action Buttons */}
            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="large" startIcon={<ShoppingCartIcon />} fullWidth>
                Add to Cart
              </Button>
              <IconButton color="secondary">
                <FavoriteIcon />
              </IconButton>
              <IconButton color="secondary">
                <ShareIcon />
              </IconButton>
            </Stack>
            
            {/* Shipping and Processing Info */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocalShippingIcon color="action" />
                  <Typography variant="body1">
                    Shipping: {product.shipping_Time || product.shipping_time}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon color="action" />
                  <Typography variant="body1">
                    Processing: {product.processing_Time || product.processing_time}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
            
            {/* Tabbed Section for Description & More */}
            <Box>
              <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                <Tab label="Description" />
                <Tab label="Additional Info" />
              </Tabs>
              <Box mt={2}>
                {tabValue === 0 && (
                  <>
                    <Typography variant="body1" paragraph>
                      {product.description}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Materials:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {product.materials_Made?.map((material, idx) => (
                        <Chip key={idx} label={material} size="small" variant="outlined" color="primary" />
                      ))}
                    </Stack>
                    <Typography variant="subtitle1" fontWeight="bold" mt={2} gutterBottom>
                      Tags:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {product.tags?.map((tag, idx) => (
                        <Chip key={idx} label={tag} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </>
                )}
                {tabValue === 1 && (
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" fontWeight="medium">
                        More Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        {product.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
