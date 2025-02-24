import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../store/cartSlice';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { userData } = useSelector((state) => state.auth);
  const uid = userData?.userId || userData?._id;

  const { products } = useSelector((state) => state.product);
  const productDetail =
    products.find((prod) => prod._id === item.productId) || item.productData || {};

  const handleRemove = () => {
    dispatch(removeFromCart({ userId: uid, productId: item.productId }));
    toast.success("Product removed from cart");
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(
        updateCartQuantity({
          userId: uid,
          productId: item.productId,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleIncrease = () => {
    dispatch(
      updateCartQuantity({
        userId: uid,
        productId: item.productId,
        quantity: item.quantity + 1,
      })
    );
  };

  const name = item.name || productDetail.name || "Product Name";
  const price = Number(item.price || productDetail.price || 0);
  const discountPercent = Number(
    item.discountPercent || productDetail.percentage_Discount || 0
  );
  const images = item.images || productDetail.images || [];
  const discountedPrice = price - (price * discountPercent) / 100;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 2,
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        image={images[0] || 'https://via.placeholder.com/150'}
        alt={name}
        sx={{
          width: { xs: '100%', sm: 150 },
          height: { xs: 200, sm: 'auto' },
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
        >
          {name}
        </Typography>
        {discountPercent > 0 ? (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ textDecoration: 'line-through', mr: 1, color: 'text.secondary' }}
            >
              ₹{price.toFixed(2)}
            </Typography>
            <Typography variant="body1" color={theme.palette.custom?.highlight || 'primary'} fontWeight="bold">
              ₹{discountedPrice.toFixed(2)}
            </Typography>
            <Typography
              variant="caption"
              color="error"
              sx={{ ml: 1, fontWeight: 'bold' }}
            >
              {discountPercent}% OFF
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1" color="text.primary" gutterBottom>
            ₹{price.toFixed(2)}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton onClick={handleDecrease} disabled={item.quantity <= 1}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1, fontWeight: 'bold' }}>
            {item.quantity}
          </Typography>
          <IconButton onClick={handleIncrease}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleRemove}
            startIcon={<DeleteIcon />}
            size="small"
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;
