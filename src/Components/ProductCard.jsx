import React, { memo, useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Use product.images (instead of product.Images)
  const images = product.images && product.images.length > 0 ? product.images : ["none"];
  // Check stock using product.stock (if stock <= 0, it's out of stock)
  const isOutOfStock = product.stock <= 0;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCurrentImage(0);
  }, []);

  useEffect(() => {
    let timer;
    if (isHovered && images.length > 1 && !isOutOfStock) {
      timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1500);
    }
    return () => timer && clearInterval(timer);
  }, [isHovered, images, isOutOfStock]);

  const discountBadge = useMemo(() => {
    if (product.discount) {
      return (
        <Box
          sx={{
            position: "absolute",
            top: isMobile ? 8 : 16,
            left: isMobile ? 8 : 16,
            backgroundColor: theme.palette.custom?.accent || "red",
            px: isMobile ? 0.5 : 1,
            py: isMobile ? 0.25 : 0.5,
            borderRadius: 1,
            zIndex: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: isMobile ? "0.65rem" : "0.75rem",
            }}
          >
            {product.percentage_Discount}% OFF
          </Typography>
        </Box>
      );
    }
    return null;
  }, [product.discount, product.percentage_Discount, isMobile, theme.palette.custom, theme.palette.primary.main]);

  return (
    <Card
      sx={{
        borderRadius: isHovered ? 0 : 2,
        overflow: "hidden",
        backgroundColor: isHovered ? theme.palette.primary.main : "transparent",
        boxShadow: isHovered ? theme.shadows[4] : "none",
        position: "relative",
        width: "100%",
        maxWidth: {
          xs: "160px",
          sm: "200px",
          md: "100%",
        },
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: {
                xs: "133%",
                sm: "130%",
                md: "125%",
              },
            }}
          >
            <CardMedia
              component="img"
              image={images[currentImage]}
              alt={product.name}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
                transform: isHovered ? "scale(1.03)" : "scale(1)",
                borderRadius: isHovered ? 0 : 2,
              }}
            />
          </Box>
          {discountBadge}
          {isOutOfStock && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
              >
                OUT OF STOCK
              </Typography>
            </Box>
          )}
          {isHovered && !isOutOfStock && (
            <Box
              sx={{
                position: "absolute",
                top: isMobile ? 4 : 8,
                right: isMobile ? 4 : 8,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 0.5 : 1,
                zIndex: 2,
              }}
            >
              <Tooltip title={isFavorite ? "Wishlisted" : "Add to wishlist"}>
                <IconButton
                  size={isMobile ? "small" : "medium"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFavorite((prev) => !prev);
                  }}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                  }}
                >
                  {isFavorite ? (
                    <FavoriteIcon
                      sx={{
                        color: theme.palette.custom?.highlight || "red",
                        fontSize: isMobile ? "1rem" : "1.25rem",
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{
                        color: theme.palette.custom?.highlight || "red",
                        fontSize: isMobile ? "1rem" : "1.25rem",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Add to Cart">
                <IconButton
                  size={isMobile ? "small" : "medium"}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{
                      color: theme.palette.custom?.highlight || "green",
                      fontSize: isMobile ? "1rem" : "1.25rem",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
        <CardContent
          sx={{
            pt: { xs: 1.5, sm: 2, md: 3 },
            pb: { xs: 1, sm: 1.5, md: 2 },
            px: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.secondary.main,
              textTransform: "uppercase",
              letterSpacing: 1,
              mb: 0.5,
              fontSize: {
                xs: "0.6rem",
                sm: "0.65rem",
                md: "0.75rem",
              },
            }}
          >
            {product.categories}
          </Typography>
          <Divider
            sx={{
              width: { xs: 20, sm: 30, md: 40 },
              borderColor: theme.palette.custom?.highlight || "black",
              borderWidth: { xs: 1, sm: 1.5, md: 2 },
              mb: { xs: 1, sm: 1.5, md: 2 },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.neutral?.light || "black",
              fontSize: {
                xs: "0.75rem",
                sm: "0.85rem",
                md: "1rem",
              },
              fontWeight: 500,
              mb: 0.5,
              lineHeight: 1.4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.custom?.highlight || "black",
              fontSize: {
                xs: "0.85rem",
                sm: "0.95rem",
                md: "1.1rem",
              },
              fontWeight: 600,
            }}
          >
            {product.currency === "INR" ? "₹" : ""}
            {product.price}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default memo(ProductCard);
