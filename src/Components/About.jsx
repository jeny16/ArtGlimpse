import { Heart, Package, Sparkles, Weight } from "lucide-react";
import { Box, Container, Grid, Typography } from "@mui/material";

const About = () => (
  <Box sx={{ padding: '100px' }}>
    <Container>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6} sx={{ padding: '25px' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#814d0b",
              mb: 3,
            }}
          >
            OUR STORY
          </Typography>
          <Typography sx={{ textAlign: "justify", fontWeight: 500 }} paragraph>
            Founded in 2020, ArtGlimpse began as a small workshop crafting
            personalized resin gifts. Today, we're proud to be one of India's
            leading artisanal resin crafting studios, serving customers
            nationwide with our unique, handcrafted creations.
          </Typography>
          <Typography sx={{ textAlign: "justify", fontWeight: 500 }} paragraph>
            Our team of skilled artisans combines traditional Indian aesthetics
            with modern resin art techniques to create pieces that are both
            beautiful and meaningful. Each item is carefully crafted to preserve
            the cultural significance while adding a contemporary touch.
          </Typography>
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "row", // default for larger screens
              justifyContent: "space-around",
              alignItems: "center",
              gap: 3,
              mt: 4,
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column", // change to column for mobile screens
              },
            })}
          >
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <Heart
                size={32}
                style={{ color: "#c17912", marginBottom: "8px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                HandCrafted
              </Typography>
              <Typography variant="body2" fontWeight={700} color="text.secondary">
                Made With Love ❤️
              </Typography>
            </Box>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <Package
                size={32}
                style={{ color: "#c17912", marginBottom: "8px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                Custom Orders
              </Typography>
              <Typography variant="body2" fontWeight={700} color="text.secondary">
                Your Vision, our Craft
              </Typography>
            </Box>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <Sparkles
                size={32}
                style={{ color: "#c17912", marginBottom: "8px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                Premium Quality
              </Typography>
              <Typography variant="body2" fontWeight={700} color="text.secondary">
                Built to Last
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/assets/WhatsApp Image 2025-01-14 at 12.19.10 AM.jpeg"
            alt="Workshop"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default About;
