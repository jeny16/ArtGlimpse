import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Divider,
  Checkbox,
  FormControlLabel,
  Slider,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Sort";
import { ProductCard } from "../Components";

const ShopPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [showFilters, setShowFilters] = React.useState(!isMobile);
  const [sortBy, setSortBy] = React.useState("featured");
  const [page, setPage] = React.useState(1);

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

  const products = [
    {
      id: 1,
      name: "Traditional Antique Brass Lotus Pooja Thali Set",
      price: "₹1,499 - ₹2,499",
      category: "POOJA ESSENTIALS",
      image: "src/assets/Screenshot 2025-01-12 144710.png",
    },
    // ... other products
  ];

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const FilterSection = () => (
    <Card
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        border: "1px solid #F5F5F5",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#2C2C2C", fontWeight: 600, fontSize: "1.1rem" }}
          >
            FILTER BY
          </Typography>
          {isMobile && (
            <IconButton onClick={() => setShowFilters(false)} size="small">
              <CloseIcon sx={{ color: "#2C2C2C" }} />
            </IconButton>
          )}
        </Box>

        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: "#2C2C2C", mb: 1, fontWeight: 500 }}
          >
            Category
          </Typography>
          <Grid container spacing={1}>
            {categories.map((category) => (
              <Grid item xs={6} key={category}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: "#757575",
                        "&.Mui-checked": {
                          color: "#424242",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                        },
                        fontWeight: 500
                      }}
                    />
                  }
                  label={category}
                  sx={{
                    margin: 0,
                    color: "#616161",
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.8rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 2, borderColor: "#F0F0F0" }} />

        <Box style={{ padding: '0 16px' }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#2C2C2C", mb: 1, fontWeight: 500 }}
          >
            Price Range
          </Typography>
          <Slider
            defaultValue={[100, 1000]}
            valueLabelDisplay="auto"
            min={100} // Minimum value for the slider
              max={1000}
            sx={{
              color: "#424242",
              "& .MuiSlider-thumb": {
                backgroundColor: "#FFFFFF",
                border: "2px solid #424242",
              },
              "& .MuiSlider-track": {
                backgroundColor: "#424242",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#E0E0E0",
              },
              
              // m: 2, // Keeps margin on all sides
              // mx: 4, // Adds extra horizontal margin
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: "#757575", display: "block" }}
              >
                Min Price
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#2C2C2C", fontWeight: 500 }}
              >
                ₹499
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                sx={{ color: "#757575", display: "block" }}
              >
                Max Price
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#2C2C2C", fontWeight: 500 }}
              >
                ₹9,999
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );

  // Rest of the component remains the same...
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#F8F9FA",
        pt: { xs: "88px", md: "96px" },
        pb: { xs: 6, md: 8 },
        minHeight: { xs: `calc(100vh - 64px)`, md: `calc(100vh - 64px)` },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Decorative Background Element */}
      <Box
        sx={{
          position: "absolute",
          top: 64,
          left: 0,
          width: "40%",
          height: "100%",
          backgroundColor: "#F5F5F5",
          clipPath: "polygon(0 0, 75% 0, 100% 100%, 0 100%)",
          zIndex: 0,
          bottom: 0,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, flex: 1 }}
      >
        {/* Mobile Filter Toggle */}
        {isMobile && (
          <Button
            fullWidth
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(true)}
            sx={{
              mb: 3,
              backgroundColor: "#424242",
              "&:hover": {
                backgroundColor: "#2C2C2C",
              },
            }}
          >
            Show Filters
          </Button>
        )}

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Filter Sidebar */}
          {(showFilters || !isMobile) && (
            <Grid item xs={12} md={3}>
              <FilterSection />
            </Grid>
          )}

          {/* Product Grid */}
          <Grid item xs={12} md={showFilters ? 9 : 12}>
            {/* Sort Section */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SortIcon sx={{ color: "#757575", mr: 1 }} />
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  size="small"
                  sx={{
                    minWidth: 200,
                    backgroundColor: "#FFFFFF",
                    "& .MuiSelect-select": {
                      py: 1,
                    },
                  }}
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </Select>
              </Box>
            </Box>

            {/* Products */}
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={10}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#424242",
                    "&.Mui-selected": {
                      backgroundColor: "#424242",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#2C2C2C",
                      },
                    },
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShopPage;
