import React from "react";
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { ProductCard } from "../Components";

const ShopPage = () => {
  const categories = [
    "Pooja Thali",
    "Key Chain",
    "Marriage Gifts",
    "Photo Frames",
    "Wall arts",
    "Jewellery",
    "Wooden Art",
    "God Frame",
  ];
  const brands = ["State", "Cooper", "Barefoot", "Ajaira", "Cece"];
  const colors = ["#000", "#C5C5C5", "#7A4F38", "#F4AAB9", "#72A5B3"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const headerHeight = "64px";
  const products = [
    {
      id: 1,
      name: "Traditional Antique Brass Lotus Pooja Thali Set with Diya and Bell",
      price: "₹1,499 - ₹2,499",
      category: "POOJA ESSENTIALS",
      image: "src/assets/Screenshot 2025-01-12 144710.png",
    },
    {
      id: 2,
      name: "Handcrafted Brass Peacock Incense Holder with Intricate Designs",
      price: "₹399 - ₹699",
      category: "HOME DECOR",
      image: "src/assets/Screenshot 2025-01-12 144710.png",
    },
    {
      id: 3,
      name: "Vintage Style Brass Ganesha Idol with Traditional Temple Design",
      price: "₹999 - ₹1,999",
      category: "RELIGIOUS ARTIFACTS",
      image: "src/assets/Screenshot 2025-01-12 144710.png",
    },
    {
      id: 4,
      name: "Handmade Brass Oil Lamp Set with Decorative Lotus Base (Set of 5)",
      price: "₹799 - ₹1,299",
      category: "FESTIVAL SPECIALS",
      image: "src/assets/Screenshot 2025-01-12 144710.png",
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor={"#fdf6e9"}
      minHeight="100vh"
      px={3}
      paddingBottom={5}
      pt={`calc(${headerHeight} + 16px)`}
    >
      <Box display="flex" gap={4}>
        {/* Sidebar */}
        <Box width="300px" bgcolor="white" p={2} borderRadius={2} boxShadow={1}>
          <Typography fontWeight={700} variant="h5" gutterBottom>
            FILTER BY
          </Typography>

          {/* Categories */}
          <Box mb={3}>
            <Typography fontWeight={700} variant="subtitle1">
              Category
            </Typography>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={<Checkbox />}
                label={category}
              />
            ))}
          </Box>

          {/* Price Range */}
          <Box mb={3}>
            <Typography fontWeight={700} variant="subtitle1">
              Price Range
            </Typography>
            <Slider
              defaultValue={50}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <input type="number" placeholder="Min" style={{ width: "45%" }} />
              <input type="number" placeholder="Max" style={{ width: "45%" }} />
            </Box>
          </Box>

          {/* Brand */}
          <Box mb={3}>
            <Typography fontWeight={700} variant="subtitle1">
              Brand
            </Typography>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={<Checkbox />}
                label={brand}
              />
            ))}
          </Box>

          {/* Color */}
          <Box mb={3}>
            <Typography fontWeight={700} variant="subtitle1">
              Color
            </Typography>
            <Box display="flex" gap={1}>
              {colors.map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Size & Fit */}
          <Box mb={3}>
            <Typography fontWeight={700} variant="subtitle1">
              Size & Fit
            </Typography>
            {sizes.map((size) => (
              <FormControlLabel
                key={size}
                control={<Checkbox />}
                label={size}
              />
            ))}
          </Box>
        </Box>

        {/* Product Grid */}
        <Box flex={1}>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopPage;
