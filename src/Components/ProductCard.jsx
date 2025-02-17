import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [isFavorite, setIsFavorite] = useState(false);
  const products = [
    {
      id: 1,
      name: "Traditional Antique Brass Lotus Pooja Thali Set with Diya and Bell",
      price: "₹1,499 - ₹2,499",
      category: "POOJA ESSENTIALS",
      image: "src/assets/image (5).jpg",
    },
    {
      id: 2,
      name: "Handcrafted Brass Peacock Incense Holder with Intricate Designs",
      price: "₹399 - ₹699",
      category: "HOME DECOR",
      image: "src/assets/image (6).jpg",
    },
    {
      id: 3,
      name: "Vintage Style Brass Ganesha Idol with Traditional Temple Design",
      price: "₹999 - ₹1,999",
      category: "RELIGIOUS ARTIFACTS",
      image: "src/assets/image (7).jpg",
    },
    {
      id: 4,
      name: "Handmade Brass Oil Lamp Set with Decorative Lotus Base (Set of 5)",
      price: "₹799 - ₹1,299",
      category: "FESTIVAL SPECIALS",
      image: "src/assets/image (8).jpg",
    },
  ];

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        overflow: "visible",
        backgroundColor: theme.palette.primary.main,
        boxShadow: "none",
        position: "relative",
        "&:hover": {
          "& .MuiCardMedia-root": {
            transform: "scale(1.03)",
            transition: "transform 0.3s ease-in-out",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={product.image || "none"}
          alt={product.name}
          sx={{
            objectFit: "cover",
            borderRadius: "8px",
            transition: "transform 0.3s ease-in-out",
          }}
        />
        <IconButton
          onClick={() => setIsFavorite(!isFavorite)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: theme.palette.custom.highlight }} />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: theme.palette.custom.highlight }}
            />
          )}
        </IconButton>
      </Box>

      <CardContent
        sx={{
          pt: 4,
          pb: 2,
          px: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.secondary.main,
            fontFamily: theme.typography.fontFamily,
            letterSpacing: "1px",
            display: "block",
            mb: 1,
          }}
        >
          {product.category || "BRASS PRODUCT"}
        </Typography>

        <Divider
          sx={{
            width: "40px",
            borderColor: theme.palette.custom.highlight,
            borderWidth: "2px",
            mb: 2,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontFamily: theme.typography.h3.fontFamily,
            color: theme.palette.neutral.light,
            fontSize: isMobile ? "0.9rem" : "1rem",
            fontWeight: 500,
            mb: 1,
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.custom.highlight,
            fontSize: isMobile ? "1rem" : "1.1rem",
            fontWeight: 600,
          }}
        >
          {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
