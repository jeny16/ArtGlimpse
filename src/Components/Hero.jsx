import React from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const Hero = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Paper
            sx={{
                position: "relative",
                height: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                mt: 12,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/Screenshot 2025-01-12 144638.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                textAlign: "center",
            }}
        >
            <Container>
                <Box px={2}>
                    <Typography
                        variant={isSmallScreen ? "h4" : "h2"}
                        component="h1"
                        sx={{
                            fontFamily: "'Raleway', serif",
                            fontWeight: "bold",
                            mb: 3,
                            letterSpacing: "0.05em",
                            textShadow: "3px 3px 10px rgba(0,0,0,0.7)",
                            animation: "fadeIn 1s ease-in-out",
                        }}
                    >
                        Handmade Resin Creations for Every Occasion
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            fontSize: isSmallScreen ? "1rem" : "1.25rem",
                            fontFamily: "'Raleway', sans-serif",
                            textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
                            animation: "fadeIn 1.5s ease-in-out",
                        }}
                    >
                        Customizable Gifts for Weddings, Birthdays & Events
                    </Typography>
                    <Box
                        display="flex"
                        gap={6}
                        justifyContent="center"
                        flexWrap="wrap"
                        sx={{
                            animation: "fadeIn 2s ease-in-out",
                        }}
                    >
                        <Link to='/shop'>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: theme.palette.custom.main,
                                    color: "#fff",
                                    px: 4,
                                    py: 1.5,
                                    fontFamily: "'Raleway', sans-serif",
                                    fontSize: "1rem",
                                    borderRadius: "30px",
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": {
                                        bgcolor: theme.palette.custom.light,
                                        transform: "scale(1.05)"
                                    },
                                }}
                            >
                                Shop Now
                            </Button>
                        </Link>
                        <Link to='/aboutUs'>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: "1rem",
                                    fontFamily: "'Raleway', sans-serif",
                                    color: theme.palette.custom.main,
                                    borderRadius: "30px",
                                    borderColor: theme.palette.custom.main,
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": {
                                        borderColor: theme.palette.custom.light,
                                        color: theme.palette.custom.light,
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                Learn More
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Paper>
    );
};

export default Hero;
