import React from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Stack,
  styled,
} from '@mui/material';

// Styled components for better layout
const CategoryLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  marginRight: 0,
  width: '100%',
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& .MuiCheckbox-root': {
    paddingTop: 4,
    paddingBottom: 4,
  },
}));

const ScrollableFormGroup = styled(FormGroup)({
  maxHeight: '250px',
  overflowY: 'auto',
  marginRight: '-8px',
  paddingRight: '8px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#9e9e9e',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f5f5f5',
  },
});

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const FilterSidebar = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}) => {
  const handlePriceChange = (event, newValue) => {
    onPriceRangeChange(newValue);
  };

  const valueText = (value) => {
    return `₹${value.toLocaleString()}`;
  };

  return (
    <Stack spacing={4}>
      {/* Categories Section */}
      <Box>
        <Typography variant="h6" gutterBottom fontWeight="500">
          Categories
        </Typography>
        <ScrollableFormGroup>
          {categories.map((category) => (
            <CategoryLabel
              key={category}
              control={
                <Checkbox
                  sx={{ color: "#e3ddd1" }}  
                  size="small"
                  value={category}
                  checked={selectedCategories.includes(category.toLowerCase())}
                  onChange={(e) =>
                    onCategoryChange(category, e.target.checked)
                  }
                />
              }
              label={category}
            />
          ))}
        </ScrollableFormGroup>
      </Box>

      {/* Price Range Section */}
      <Box>
        <Typography variant="h6" gutterBottom fontWeight="500">
          Price Range
        </Typography>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <PriceText>{valueText(priceRange[0])}</PriceText>
            <PriceText>{valueText(priceRange[1])}</PriceText>
          </Box>
          <Slider
            sx={{ color: "#e3ddd1" }}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={valueText}
            getAriaValueText={valueText}
            min={0}
            max={10000}
            step={100}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default FilterSidebar;
