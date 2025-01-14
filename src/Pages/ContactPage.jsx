import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

const ContactPage = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Heading */}
      <Typography variant="h3" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" sx={{ marginBottom: 4 }}>
        We’re here to help! Reach out to us for any queries, feedback, or just to say hello.
      </Typography>

      {/* Business Information */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Address:</strong> 123 ArtGlimpse Lane, Creative City, India
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Phone:</strong> +91 98765 43210
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong>{" "}
          <a href="mailto:hello@artglimpse.com">hello@artglimpse.com</a>
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Working Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM
        </Typography>
      </Box>

      {/* Contact Form */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Send Us a Message
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <TextField label="Name" variant="outlined" required fullWidth />
          <TextField label="Email" type="email" variant="outlined" required fullWidth />
          <TextField label="Subject" variant="outlined" required fullWidth />
          <TextField
            label="Message"
            variant="outlined"
            required
            fullWidth
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      </Box>

      {/* Instagram Accounts */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Featured Instagram Accounts
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              username: "artistic_visions",
              url: "https://www.instagram.com/artistic_visions",
            },
            {
              username: "crafted_legends",
              url: "https://www.instagram.com/crafted_legends",
            },
          ].map((account, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: "#ffffff", boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{account.username}</Typography>
                  <IconButton
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#E1306C" }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Map Embed */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Find Us
        </Typography>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093703!2d-122.41941508468953!3d37.774929779759926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d9e00e01%3A0x9c0d0d8a1185a7d!2sCreative%20City%2C%20India!5e0!3m2!1sen!2sin!4v1638802954647!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps Location"
        ></iframe>
      </Box>
    </Box>
  );
};

export default ContactPage;
