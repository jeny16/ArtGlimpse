import { Gif } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import {
  Gem,
  Gift,
  HandHelping,
  HandIcon,
  Leaf,
  Palette,
  Star,
  Truck,
} from "lucide-react";

const Features = () => {
  const features = [
    { title: "🖐️ 100% Handmade", description: "Each Piece Crafted With Care" },
    {
      title: "🎨 Fully Customizable",
      description: "Design Your Perfect Piece",
    },
    {
      title: "🎁 Perfect for Gifting",
      description: "Unique Presents For Loved Ones",
    },
    {
      title: "💎 Premium Materials",
      description: "High-Quality Resin and Accessories",
    },
    {
      title: "🚚 Ships Across India",
      description: "Nationwide Delivery Available",
    },
    {
      title: "🌿 Eco-Friendly Practices",
      description:
        "Committed to Sustainable and Environmentally Friendly Crafting.",
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            fontFamily: "serif",
            color: "#814d0b",
            fontWeight: 700,
          }}
        >
          WHY CHOOSE US
        </Typography>
        <Grid container spacing={4}>
          {/* {features.map((feature) => ( */}
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <HandIcon
                size={40}
                style={{ color: "#c17912", marginBottom: "1rem" }}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                100% Handmade
              </Typography>
              <Typography color="text.secondary">
                Each Piece Crafted With Care
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Palette
                size={40}
                style={{ color: "#c17912", marginBottom: "1rem" }}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                Fully Customizable
              </Typography>
              <Typography color="text.secondary">
                Each Piece Crafted With Care
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Gift
                size={40}
                style={{ color: "#c17912", marginBottom: "1rem" }}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                Perfect for Gifting
              </Typography>
              <Typography color="text.secondary">
                Each Piece Crafted With Care
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Gem
                size={40}
                style={{ color: "#c17912", marginBottom: "1rem" }}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                Premium Materials
              </Typography>
              <Typography color="text.secondary">
                Each Piece Crafted With Care
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Truck
                size={40}
                style={{ color: "#c17912", marginBottom: "1rem" }}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                Ships Across India
              </Typography>
              <Typography color="text.secondary">
                Each Piece Crafted With Care
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Leaf
                size={40}
                style={{ color: "#c17912", marginBottom: "1rem" }}
              />
              <Typography variant="h6" component="h3" gutterBottom>
                Eco-Friendly Practices
              </Typography>
              <Typography color="text.secondary">
                Each Piece Crafted With Care
              </Typography>
            </Box>
          </Grid>
          {/* ))} */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
