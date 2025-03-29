import React, { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Stack,
  TextField,
  Box,
  styled,
  useTheme,
  IconButton,
  Chip,
  Button,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';

const FilterAccordion = styled(Accordion)(({ theme }) => ({
  overflow: 'visible',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  borderRadius: '8px !important',
  marginBottom: theme.spacing(1.5),
}));

const FilterAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  minHeight: 48,
  borderRadius: theme.shape.borderRadius,
  '&.Mui-expanded': {
    minHeight: 48,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0),
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    margin: theme.spacing(1, 0),
  },
}));

const FilterAccordionDetails = styled(AccordionDetails)(() => ({
  overflow: 'visible',
}));

const CategoryLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  marginRight: 0,
  width: '100%',
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(0.75, 0.5),
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& .MuiCheckbox-root': {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledSearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.custom.highlight,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.custom.highlight,
      borderWidth: 1,
    },
  },
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const InStockFilterBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(2),
}));

const FilterChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  '&.MuiChip-outlined': {
    borderColor: theme.palette.divider,
  },
  '&.MuiChip-filled': {
    backgroundColor:
      theme.palette.custom.highlight || theme.palette.primary.light,
    color: theme.palette.getContrastText(
      theme.palette.custom.highlight || theme.palette.primary.light
    ),
  },
}));

// ---------------------------
// Utility Functions
// ---------------------------
const valueText = (value) => `₹${value.toLocaleString()}`;

// ---------------------------
// Main Component
// ---------------------------
const FilterSidebar = ({
  allCategories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  searchQuery,
  onSearchQueryChange,
  inStockOnly,
  onInStockOnlyChange,
  discountFilters,
  onDiscountChange,
  countries,
  selectedCountries,
  onCountryChange,
  onClearAllFilters, // New prop for clearing filters
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePriceChange = (event, newValue) => {
    onPriceRangeChange(newValue);
  };

  const discountOptions = useMemo(() => [10, 12, 15, 20, 25], []);

  // Count active filters to show in summary
  const totalActiveFilters = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 10000) count++;
    if (inStockOnly) count++;
    if (discountFilters.length > 0) count++;
    if (selectedCountries.length > 0) count++;
    if (searchQuery) count++;
    return count;
  }, [
    selectedCategories,
    priceRange,
    inStockOnly,
    discountFilters,
    selectedCountries,
    searchQuery,
  ]);

  return (
    <Stack spacing={2}>
      {/* Header with Filters Title and Clear All Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TuneIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
          <Typography variant="subtitle1" fontWeight="600">
            Filters
          </Typography>
        </Box>
        {totalActiveFilters > 0 && (
          <Button
            size="small"
            onClick={onClearAllFilters}
            sx={{ textTransform: 'none', color: theme.palette.custom.highlight }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Search by Product Name */}
      <StyledSearchField
        size="small"
        fullWidth
        placeholder="Search Products"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon
              sx={{ mr: 1, color: theme.palette.text.secondary, fontSize: '1.2rem' }}
            />
          ),
          endAdornment: searchQuery ? (
            <IconButton
              size="small"
              onClick={() => onSearchQueryChange('')}
              aria-label="clear search"
              sx={{ mr: -0.5 }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ) : null,
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            px: 1,
          },
        }}
      />

      {/* In Stock Only */}
      <InStockFilterBox>
        <FormControlLabel
          control={
            <Checkbox
              checked={inStockOnly}
              onChange={(e) => onInStockOnlyChange(e.target.checked)}
              sx={{
                color: theme.palette.text.secondary,
                '&.Mui-checked': {
                  color:
                    theme.palette.custom.highlight || theme.palette.primary.main,
                },
              }}
            />
          }
          label={
            <Typography
              variant="body2"
              sx={{
                fontWeight: inStockOnly ? 600 : 400,
                color: inStockOnly
                  ? theme.palette.custom.highlight || theme.palette.primary.main
                  : 'inherit',
              }}
            >
              In Stock Only
            </Typography>
          }
        />
      </InStockFilterBox>

      {/* Applied Filters Summary */}
      {totalActiveFilters > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Applied Filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -0.5 }}>
            {inStockOnly && (
              <FilterChip
                label="In Stock"
                size="small"
                onDelete={() => onInStockOnlyChange(false)}
                variant="filled"
              />
            )}
            {priceRange[0] > 0 && (
              <FilterChip
                label={`Min: ${valueText(priceRange[0])}`}
                size="small"
                onDelete={() => onPriceRangeChange([0, priceRange[1]])}
                variant="filled"
              />
            )}
            {priceRange[1] < 10000 && (
              <FilterChip
                label={`Max: ${valueText(priceRange[1])}`}
                size="small"
                onDelete={() => onPriceRangeChange([priceRange[0], 10000])}
                variant="filled"
              />
            )}
            {searchQuery && (
              <FilterChip
                label={`"${searchQuery}"`}
                size="small"
                onDelete={() => onSearchQueryChange('')}
                variant="filled"
              />
            )}
            {discountFilters.map((discount) => (
              <FilterChip
                key={`discount-${discount}`}
                label={`${discount}%+ Off`}
                size="small"
                onDelete={() => onDiscountChange(discount, false)}
                variant="filled"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Categories */}
      <FilterAccordion
        expanded={expanded === 'categories'}
        onChange={handleAccordionChange('categories')}
      >
        <FilterAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor:
              selectedCategories.length > 0
                ? theme.palette.action.selected
                : 'transparent',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2" fontWeight="600">
              Categories
            </Typography>
            {selectedCategories.length > 0 && (
              <Typography
                variant="caption"
                sx={{ mr: 1, color: theme.palette.custom.highlight }}
              >
                {selectedCategories.length} selected
              </Typography>
            )}
          </Box>
        </FilterAccordionSummary>
        <AccordionDetails sx={{ p: 1 }}>
          {allCategories.map((category) => {
            const normalizedCategory = category.toLowerCase().trim();
            const isSelected = selectedCategories.includes(normalizedCategory);
            return (
              <CategoryLabel
                key={category}
                control={
                  <Checkbox
                    size="small"
                    checked={isSelected}
                    onChange={(e) =>
                      onCategoryChange(category, e.target.checked)
                    }
                    sx={{
                      color: theme.palette.text.secondary,
                      '&.Mui-checked': {
                        color:
                          theme.palette.custom.highlight ||
                          theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={category}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected
                      ? theme.palette.custom.highlight ||
                      theme.palette.primary.main
                      : theme.palette.text.primary,
                  },
                }}
              />
            );
          })}
        </AccordionDetails>
      </FilterAccordion>

      {/* Price Range */}
      <FilterAccordion
        expanded={expanded === 'priceRange'}
        onChange={handleAccordionChange('priceRange')}
      >
        <FilterAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor:
              priceRange[0] > 0 || priceRange[1] < 10000
                ? theme.palette.action.selected
                : 'transparent',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2" fontWeight="600">
              Price Range
            </Typography>
            {(priceRange[0] > 0 || priceRange[1] < 10000) && (
              <Typography
                variant="caption"
                sx={{ mr: 1, color: theme.palette.custom.highlight }}
              >
                {valueText(priceRange[0])} - {valueText(priceRange[1])}
              </Typography>
            )}
          </Box>
        </FilterAccordionSummary>

        {/* Use a custom styled AccordionDetails that allows overflow */}
        <FilterAccordionDetails sx={{ p: 2 }}>
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <PriceText>{valueText(priceRange[0])}</PriceText>
            <PriceText>{valueText(priceRange[1])}</PriceText>
          </Box>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={valueText}
            getAriaValueText={valueText}
            min={0}
            max={10000}
            step={100}
            sx={{
              color:
                theme.palette.custom.highlight || theme.palette.primary.main,
              '& .MuiSlider-thumb': {
                height: 14,
                width: 14,
                '&:hover, &.Mui-active': {
                  // Make sure the boxShadow is valid
                  boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main
                    }20`,
                },
              },
            }}
          />
        </FilterAccordionDetails>
      </FilterAccordion>

      {/* Discount Filter */}
      <FilterAccordion
        expanded={expanded === 'discount'}
        onChange={handleAccordionChange('discount')}
      >
        <FilterAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor:
              discountFilters.length > 0
                ? theme.palette.action.selected
                : 'transparent',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2" fontWeight="600">
              Discount
            </Typography>
            {discountFilters.length > 0 && (
              <Typography
                variant="caption"
                sx={{ mr: 1, color: theme.palette.custom.highlight }}
              >
                {discountFilters.length} selected
              </Typography>
            )}
          </Box>
        </FilterAccordionSummary>
        <AccordionDetails sx={{ p: 1 }}>
          {discountOptions.map((discountValue) => {
            const isChecked = discountFilters.includes(discountValue);
            return (
              <CategoryLabel
                key={discountValue}
                control={
                  <Checkbox
                    size="small"
                    checked={isChecked}
                    onChange={(e) =>
                      onDiscountChange(discountValue, e.target.checked)
                    }
                    sx={{
                      color: theme.palette.text.secondary,
                      '&.Mui-checked': {
                        color:
                          theme.palette.custom.highlight ||
                          theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={`${discountValue}% or more`}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isChecked ? 600 : 400,
                    color: isChecked
                      ? theme.palette.custom.highlight ||
                      theme.palette.primary.main
                      : theme.palette.text.primary,
                  },
                }}
              />
            );
          })}
        </AccordionDetails>
      </FilterAccordion>

      {/* Countries Available */}
      <FilterAccordion
        expanded={expanded === 'countries'}
        onChange={handleAccordionChange('countries')}
      >
        <FilterAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor:
              selectedCountries.length > 0
                ? theme.palette.action.selected
                : 'transparent',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2" fontWeight="600">
              Countries
            </Typography>
            {selectedCountries.length > 0 && (
              <Typography
                variant="caption"
                sx={{ mr: 1, color: theme.palette.custom.highlight }}
              >
                {selectedCountries.length} selected
              </Typography>
            )}
          </Box>
        </FilterAccordionSummary>
        <AccordionDetails sx={{ p: 1 }}>
          {countries.map((country) => {
            const isSelected = selectedCountries.includes(country);
            return (
              <CategoryLabel
                key={country}
                control={
                  <Checkbox
                    size="small"
                    checked={isSelected}
                    onChange={(e) => onCountryChange(country, e.target.checked)}
                    sx={{
                      color: theme.palette.text.secondary,
                      '&.Mui-checked': {
                        color:
                          theme.palette.custom.highlight ||
                          theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={country}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected
                      ? theme.palette.custom.highlight ||
                      theme.palette.primary.main
                      : theme.palette.text.primary,
                  },
                }}
              />
            );
          })}
        </AccordionDetails>
      </FilterAccordion>
    </Stack>
  );
};

export default FilterSidebar;
