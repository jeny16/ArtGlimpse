import React, { memo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Divider,
  Button,
  Rating,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Dummy order data
const dummyOrders = [
  {
    id: "E202302347816",
    status: "Delivered",
    deliveredOn: "Fri, 2 Feb",
    productName: "Men's Jacket",
  },
  {
    id: "FNY674454763",
    status: "Delivered",
    deliveredOn: "Sun, 5 Feb",
    productName: "Women's Kurti",
  },
];

const SideMenuPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  minWidth: 220,
  [theme.breakpoints.down("sm")]: {
    minWidth: "auto",
  },
}));

const ProfileDashboard = () => {
  // Example: controlling the "Last x months" filter
  const [timeFilter, setTimeFilter] = useState("6");

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  return (
    <Box sx={{ mt: 20, mb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column: Side Menu */}
          <Grid item xs={12} md={3}>
            <SideMenuPaper elevation={1}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                My Account
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Orders & Credits" />
                    <Chip
                      label="New"
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="AJIO Wallet" />
                    <Chip
                      label="New"
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Invite Friends" />
                    <Chip
                      label="New"
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="My Rewards" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Customer Care" />
                  </ListItemButton>
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 1 }}>
                Profile
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Personal Information" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Address Book" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Payments" />
                  </ListItemButton>
                </ListItem>
              </List>
            </SideMenuPaper>
          </Grid>

          {/* Right Column: Main Content */}
          <Grid item xs={12} md={9}>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                My Orders
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Track your open orders & view the summary of your past orders
              </Typography>

              {/* Filter Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mb: 3,
                }}
              >
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Last x months</InputLabel>
                  <Select
                    value={timeFilter}
                    label="Last x months"
                    onChange={handleTimeFilterChange}
                  >
                    <MenuItem value="3">Last 3 months</MenuItem>
                    <MenuItem value="6">Last 6 months</MenuItem>
                    <MenuItem value="9">Last 9 months</MenuItem>
                    <MenuItem value="12">Last 12 months</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Orders List */}
              {dummyOrders.map((order) => (
                <Paper
                  key={order.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 3,
                    border: "1px solid",
                    borderColor: (theme) => theme.palette.divider,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    Order ID: {order.id}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {order.status}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      on {order.deliveredOn}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: "none" }}
                    >
                      Exchange Order
                    </Button>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Rate this Product:
                      </Typography>
                      <Rating size="small" />
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(ProfileDashboard);
