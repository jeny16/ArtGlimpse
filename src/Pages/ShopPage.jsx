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
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { ProductGrid, FilterSidebar, Loader } from "../Components";

const ITEMS_PER_PAGE = 16;

const ShopPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showFilters, setShowFilters] = useState(!isMobile);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountFilters, setDiscountFilters] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  // Fetch products from Redux store
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const allCategories = useMemo(() => {
    const unique = new Set();
    products.forEach((p) => {
      if (typeof p.categories === "string") {
        unique.add(p.categories.trim());
      }
    });
    return Array.from(unique);
  }, [products]);

  const countries = useMemo(() => {
    const countrySet = new Set();
    products.forEach((p) => {
      if (Array.isArray(p.countries_Available)) {
        p.countries_Available.forEach((c) => countrySet.add(c));
      }
    });
    return Array.from(countrySet);
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => {
        const productCat =
          typeof product.categories === "string"
            ? product.categories.toLowerCase().trim()
            : "";
        return selectedCategories.includes(productCat);
      });
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (inStockOnly) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    if (discountFilters.length > 0) {
      filtered = filtered.filter((product) => {
        if (!product.discount || !product.percentage_Discount) return false;
        return discountFilters.some(
          (dValue) => product.percentage_Discount >= dValue
        );
      });
    }

    if (selectedCountries.length > 0) {
      filtered = filtered.filter((product) => {
        if (!Array.isArray(product.countries_Available)) return false;
        return product.countries_Available.some((c) =>
          selectedCountries.includes(c)
        );
      });
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

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
  }, [
    products,
    selectedCategories,
    priceRange,
    inStockOnly,
    discountFilters,
    selectedCountries,
    searchQuery,
    sortBy,
  ]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, page]);

  const pageCount = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterClose = () => {
    setShowFilters(false);
  };

  const handleCategoryChange = (category, isChecked) => {
    const normalizedCategory = category.toLowerCase().trim();
    setSelectedCategories((prev) =>
      isChecked
        ? [...prev, normalizedCategory]
        : prev.filter((cat) => cat !== normalizedCategory)
    );
    setPage(1);
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    setPage(1);
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleInStockOnlyChange = (checked) => {
    setInStockOnly(checked);
    setPage(1);
  };

  const handleDiscountChange = (discountValue, isChecked) => {
    setDiscountFilters((prev) =>
      isChecked
        ? [...prev, discountValue]
        : prev.filter((d) => d !== discountValue)
    );
    setPage(1);
  };

  const handleCountryChange = (country, isChecked) => {
    setSelectedCountries((prev) =>
      isChecked ? [...prev, country] : prev.filter((c) => c !== country)
    );
    setPage(1);
  };

  // New clearAll function that resets all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSearchQuery("");
    setInStockOnly(false);
    setDiscountFilters([]);
    setSelectedCountries([]);
    setPage(1);
  };

  const FilterSidebarContent = (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: 2,
        borderRadius: isMobile ? 0 : 2,
        backgroundColor: theme.palette.background.paper,
        // Updated width so it does not exceed 250px
        maxWidth: { xs: "85vw", sm: 250, md: 300 },
        minWidth: { xs: "85vw", sm: 250, md: 250 },
        border: `1px solid ${theme.palette.divider}`,
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
          <IconButton onClick={handleFilterClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ mb: 3 }} />

      <FilterSidebar
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        priceRange={priceRange}
        onPriceRangeChange={handlePriceRangeChange}
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={handleInStockOnlyChange}
        discountFilters={discountFilters}
        onDiscountChange={handleDiscountChange}
        countries={countries}
        selectedCountries={selectedCountries}
        onCountryChange={handleCountryChange}
        onClearAllFilters={clearAllFilters}
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
        mt: 10,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 10, px: { xs: 2, md: 4 } }}>
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
              borderColor: theme.palette.custom.highlight,
              color: theme.palette.custom.highlight,
              "&:hover": {
                borderColor: theme.palette.custom.highlight,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Filter Products
          </Button>
        )}

        <Box sx={{ display: "flex", gap: 3, position: "relative" }}>
          {isMobile ? (
            <Drawer
              anchor="left"
              open={showFilters}
              onClose={handleFilterClose}
              PaperProps={{
                sx: { width: "85%", maxWidth: 250 },
              }}
            >
              {FilterSidebarContent}
            </Drawer>
          ) : (
            <Fade in={true}>
              <Box sx={{ flexShrink: 0 }}>{FilterSidebarContent}</Box>
            </Fade>
          )}

          <Box sx={{ flex: 1, position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                borderBottom: `1px solid ${theme.palette.custom.highlight}`,
                pb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
              </Typography>
              <FormControl
                size="small"
                sx={{
                  minWidth: 160,
                  background: "transparent",
                }}
              >
                <InputLabel
                  sx={{
                    color: theme.palette.custom.highlight,
                    "&.Mui-focused": {
                      color: theme.palette.custom.highlight,
                    },
                    "&.MuiInputLabel-shrink": {
                      color: theme.palette.custom.highlight,
                    },
                  }}
                >
                  Sort By
                </InputLabel>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                  sx={{
                    background: "transparent",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.highlight,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.highlight,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.highlight,
                    },
                    color: theme.palette.custom.highlight,
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.custom.highlight,
                    },
                  }}
                >
                  <MenuItem
                    value="featured"
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.custom.highlight,
                        color: theme.palette.getContrastText(theme.palette.custom.highlight),
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: theme.palette.custom.highlight,
                      },
                    }}
                  >
                    Featured
                  </MenuItem>
                  <MenuItem
                    value="newest"
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.custom.highlight,
                        color: theme.palette.getContrastText(theme.palette.custom.highlight),
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: theme.palette.custom.highlight,
                      },
                    }}
                  >
                    Newest
                  </MenuItem>
                  <MenuItem
                    value="price_low"
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.custom.highlight,
                        color: theme.palette.getContrastText(theme.palette.custom.highlight),
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: theme.palette.custom.highlight,
                      },
                    }}
                  >
                    Price: Low to High
                  </MenuItem>
                  <MenuItem
                    value="price_high"
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.custom.highlight,
                        color: theme.palette.getContrastText(theme.palette.custom.highlight),
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: theme.palette.custom.highlight,
                      },
                    }}
                  >
                    Price: High to Low
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 400,
                }}
              >
                <Loader />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            ) : (
              <>
                <ProductGrid products={paginatedProducts} columns={3} />

                {pageCount > 1 && (
                  <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={handlePageChange}
                      sx={{
                        "& .MuiPaginationItem-root.Mui-selected": {
                          backgroundColor: theme.palette.custom.highlight,
                          color: "#fff",
                        },
                      }}
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
