// // import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
// // import {
// //   Box,
// //   Container,
// //   useTheme,
// //   useMediaQuery,
// //   Button,
// // } from "@mui/material";
// // import FilterListIcon from "@mui/icons-material/FilterList";
// // import { ProductGrid, FilterSidebar, SortSection, PaginationComponent } from "../Components";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchProducts } from "../store/productSlice";

// // const ShopPage = () => {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// //   const [showFilters, setShowFilters] = useState(!isMobile);
// //   const [sortBy, setSortBy] = useState("featured");
// //   const [page, setPage] = useState(1);

// //   // Remove static products; fetch from Redux store instead
// //   const dispatch = useDispatch();
// //   const { products, isLoading, error } = useSelector((state) => state.product);

// //   useEffect(() => {
// //     // Dispatch the thunk to fetch products if not already loaded
// //     if (!products.length) {
// //       dispatch(fetchProducts());
// //     }
// //   }, [dispatch, products.length]);

// //   // Static categories remain (if you want to keep these as static values)
// //   const categories = useMemo(
// //     () => [
// //       "Pooja Thali",
// //       "Key Chain",
// //       "Marriage Gifts",
// //       "Photo Frames",
// //       "Wall arts",
// //       "Jewellery",
// //       "Wooden Art",
// //       "God Frame",
// //     ],
// //     []
// //   );

// //   // Handlers with useCallback to avoid unnecessary re-creations
// //   const handleSortChange = useCallback((event) => {
// //     setSortBy(event.target.value);
// //   }, []);

// //   const handlePageChange = useCallback((event, value) => {
// //     setPage(value);
// //   }, []);

// //   const handleFilterClose = useCallback(() => {
// //     setShowFilters(false);
// //   }, []);

// //   return (
// //     <Box
// //       sx={{
// //         position: "relative",
// //         overflow: "hidden",
// //         backgroundColor: "#F8F9FA",
// //         pt: { xs: "88px", md: "96px" },
// //         pb: { xs: 6, md: 8 },
// //         minHeight: { xs: `calc(100vh - 64px)`, md: `calc(100vh - 64px)` },
// //         display: "flex",
// //         flexDirection: "column",
// //       }}
// //     >
// //       {/* Decorative Background */}
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           top: 64,
// //           left: 0,
// //           width: "40%",
// //           height: "100%",
// //           backgroundColor: "#F5F5F5",
// //           clipPath: "polygon(0 0, 75% 0, 100% 100%, 0 100%)",
// //           zIndex: 0,
// //           bottom: 0,
// //         }}
// //       />

// //       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, flex: 1 }}>
// //         {/* Mobile Filter Toggle */}
// //         {isMobile && (
// //           <Button
// //             fullWidth
// //             variant="contained"
// //             startIcon={<FilterListIcon />}
// //             onClick={() => setShowFilters(true)}
// //             sx={{
// //               mb: 3,
// //               backgroundColor: "#424242",
// //               "&:hover": { backgroundColor: "#2C2C2C" },
// //             }}
// //           >
// //             Show Filters
// //           </Button>
// //         )}

// //         <Box
// //           sx={{
// //             display: "flex",
// //             flexDirection: { xs: "column", md: "row" },
// //             gap: 4,
// //           }}
// //         >
// //           {(showFilters || !isMobile) && (
// //             <Box sx={{ flex: { xs: "none", md: "0 1 25%" } }}>
// //               <FilterSidebar
// //                 isMobile={isMobile}
// //                 onClose={handleFilterClose}
// //                 categories={categories}
// //               />
// //             </Box>
// //           )}

// //           <Box sx={{ flex: 1 }}>
// //             <SortSection sortBy={sortBy} onSortChange={handleSortChange} />
// //             {isLoading ? (
// //               <Box>Loading...</Box>
// //             ) : error ? (
// //               <Box>Error: {error}</Box>
// //             ) : (
// //               <ProductGrid products={products} />
// //             )}
// //             <PaginationComponent page={page} onPageChange={handlePageChange} />
// //           </Box>
// //         </Box>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default memo(ShopPage);

import React, { memo, useMemo, useState, useEffect } from "react";
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Button,
  Paper,
  Typography,
  Fade,
  Drawer,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { ProductGrid, FilterSidebar } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";

const ShopPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 16;

  // State for filters (stored in lowercase)
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Fetch products from Redux store
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Categories as provided by the filter list
  const categories = useMemo(
    () => [
      "Toys & Collectibles",
      "Bags & Wallets",
      "Resin Art & Decor",
      "Home Decor",
      "Jewelry & Accessories",
    ],
    []
  );

  // Filter and sort products using product.categories (with an "s")
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      let productCategory = "";
      // Use product.categories instead of product.category
      if (typeof product.categories === "string") {
        productCategory = product.categories.toLowerCase().trim();
      } else if (product.categories && product.categories.name) {
        productCategory = product.categories.name.toLowerCase().trim();
      }
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(productCategory);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "featured":
        default:
          return b.featured ? 1 : -1;
      }
    });

    return filtered;
  }, [products, selectedCategories, priceRange, sortBy]);

  // Pagination logic
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedProducts, page]);

  const pageCount = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

  const handlers = {
    sortChange: (event) => {
      setSortBy(event.target.value);
      setPage(1);
    },
    pageChange: (event, value) => setPage(value),
    filterClose: () => setShowFilters(false),
    // Normalize category to lowercase and trim whitespace when storing
    categoryChange: (category, isChecked) => {
      const normalizedCategory = category.toLowerCase().trim();
      setSelectedCategories((prev) =>
        isChecked
          ? [...prev, normalizedCategory]
          : prev.filter((cat) => cat !== normalizedCategory)
      );
      setPage(1);
    },
    priceRangeChange: (newRange) => {
      setPriceRange(newRange);
      setPage(1);
    },
  };

  const FilterSidebarContent = (
    <Paper
      elevation={isMobile ? 0 : 3}
      sx={{
        height: "100%",
        p: 3,
        borderRadius: isMobile ? 0 : 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="700">
          Filters
        </Typography>
        {isMobile && (
          <IconButton onClick={handlers.filterClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ mb: 3 }} />
      <FilterSidebar
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handlers.categoryChange}
        priceRange={priceRange}
        onPriceRangeChange={handlers.priceRangeChange}
      />
    </Paper>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        pt: { xs: 3, md: 4 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 20 ,px: { xs: 2, md: 4 } }}>
        {isMobile && (
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(true)}
            sx={{
              mb: 3,
              width: "100%",
              textTransform: "none",
              fontWeight: 600,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Filter Products
          </Button>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 4,
            position: "relative",
          }}
        >
          {isMobile ? (
            <Drawer
              anchor="left"
              open={showFilters}
              onClose={handlers.filterClose}
              PaperProps={{
                sx: { width: "85%", maxWidth: 360 },
              }}
            >
              {FilterSidebarContent}
            </Drawer>
          ) : (
            <Fade in={true}>
              <Box sx={{ width: 300, flexShrink: 0 }}>
                {FilterSidebarContent}
              </Box>
            </Fade>
          )}

          <Box sx={{ flex: 1 }}>
            <Paper
              sx={{
                p: 2,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              elevation={2}
            >
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={handlers.sortChange}
                  label="Sort By"
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="price_low">Price: Low to High</MenuItem>
                  <MenuItem value="price_high">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Paper>

            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 400,
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            ) : (
              <>
                <Box sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {paginatedProducts.length} of{" "}
                    {filteredAndSortedProducts.length} products
                  </Typography>
                </Box>
                <ProductGrid products={paginatedProducts} />
                {pageCount > 1 && (
                  <Box
                    sx={{ mt: 4, display: "flex", justifyContent: "center" }}
                  >
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={handlers.pageChange}
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(ShopPage);
