import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ProductGrid, FilterSidebar, SortSection, PaginationComponent } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";

const ShopPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  // Remove static products; fetch from Redux store instead
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    // Dispatch the thunk to fetch products if not already loaded
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Static categories remain (if you want to keep these as static values)
  const categories = useMemo(
    () => [
      "Pooja Thali",
      "Key Chain",
      "Marriage Gifts",
      "Photo Frames",
      "Wall arts",
      "Jewellery",
      "Wooden Art",
      "God Frame",
    ],
    []
  );

  // Handlers with useCallback to avoid unnecessary re-creations
  const handleSortChange = useCallback((event) => {
    setSortBy(event.target.value);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleFilterClose = useCallback(() => {
    setShowFilters(false);
  }, []);

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
      {/* Decorative Background */}
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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, flex: 1 }}>
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
              "&:hover": { backgroundColor: "#2C2C2C" },
            }}
          >
            Show Filters
          </Button>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {(showFilters || !isMobile) && (
            <Box sx={{ flex: { xs: "none", md: "0 1 25%" } }}>
              <FilterSidebar
                isMobile={isMobile}
                onClose={handleFilterClose}
                categories={categories}
              />
            </Box>
          )}

          <Box sx={{ flex: 1 }}>
            <SortSection sortBy={sortBy} onSortChange={handleSortChange} />
            {isLoading ? (
              <Box>Loading...</Box>
            ) : error ? (
              <Box>Error: {error}</Box>
            ) : (
              <ProductGrid products={products} />
            )}
            <PaginationComponent page={page} onPageChange={handlePageChange} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(ShopPage);
