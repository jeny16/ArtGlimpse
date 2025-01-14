import React from 'react';
import { Container, Box, Typography, TextField, Button, Divider, Link, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import SignupImg from '/assets/WhatsApp Image 2025-01-14 at 12.19.10 AM.jpeg';

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const theme = useTheme();
    const [error, setError] = React.useState(null);

    const signup = (data) => {
        // Handle signup logic
        console.log(data);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "85px",
                backgroundColor: '#f5f5f5',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    boxShadow: { md: 10 },
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    minHeight: '85vh',
                    width: '75%',
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(${SignupImg})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: theme.palette.shades.light,
                        margin: "-12px"
                    }}
                />
                <Box
                    sx={{
                        flex: 1,
                        padding: { xs: 4, md: 6 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        align="center"
                        color={theme.palette.custom.highlight}
                        sx={{ marginBottom: 2 }}
                    >
                        Create an Account
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color={theme.palette.text.secondary}
                        sx={{ marginBottom: 4 }}
                    >
                        Please fill in the details to sign up.
                    </Typography>
                    {error && (
                        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(signup)}
                        sx={{ width: '100%', maxWidth: 400 }}
                    >
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                placeholder="Enter Your Full Name"
                                autoComplete="name"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                {...register('name', {
                                    required: 'Full Name is Required!',
                                })}
                                InputProps={{
                                    sx: {
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme.palette.custom.highlight,
                                        },
                                        '&.Mui-focused .MuiInputBase-input': {
                                            color: theme.palette.custom.highlight,
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        '&.Mui-focused': {
                                            color: theme.palette.custom.highlight,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                placeholder="Enter Your Email"
                                type="email"
                                autoComplete="username"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register('email', {
                                    required: 'Email address is Required!',
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            'Email address must be a valid address',
                                    },
                                })}
                                InputProps={{
                                    sx: {
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme.palette.custom.highlight,
                                        },
                                        '&.Mui-focused .MuiInputBase-input': {
                                            color: theme.palette.custom.highlight,
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        '&.Mui-focused': {
                                            color: theme.palette.custom.highlight,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Password"
                                placeholder="Enter Your Password"
                                type="password"
                                autoComplete="new-password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register('password', {
                                    required: 'Password is Required!',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long',
                                    },
                                })}
                                InputProps={{
                                    sx: {
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme.palette.custom.highlight,
                                        },
                                        '&.Mui-focused .MuiInputBase-input': {
                                            color: theme.palette.custom.highlight,
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        '&.Mui-focused': {
                                            color: theme.palette.custom.highlight,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                placeholder="Confirm Your Password"
                                type="password"
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is Required!',
                                    validate: (value, context) =>
                                        value === context.password || 'Passwords do not match',
                                })}
                                InputProps={{
                                    sx: {
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: theme.palette.custom.highlight,
                                        },
                                        '&.Mui-focused .MuiInputBase-input': {
                                            color: theme.palette.custom.highlight,
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        '&.Mui-focused': {
                                            color: theme.palette.custom.highlight,
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                bgcolor: theme.palette.custom.highlight,
                                color: '#fff',
                                '&:hover': { bgcolor: theme.palette.custom.accent },
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>

                    <Divider sx={{ mt: 4, mb: 4, width: '100%', maxWidth: 400 }}>
                        <Typography color="textSecondary">OR</Typography>
                    </Divider>

                    <Typography
                        align="center"
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 2 }}
                    >
                        Already have an account?&nbsp;
                        <Link
                            href="/login"
                            sx={{
                                fontWeight: 'medium',
                                color: theme.palette.custom.highlight,
                            }}
                        >
                            Log In
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Signup;
