import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const AuthDialog = ({ open, onClose, isLogin }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
        <DialogContent>
            <Box component="form" sx={{ pt: 2 }}>
                {!isLogin && (
                    <TextField
                        fullWidth
                        label="Full Name"
                        margin="normal"
                        required
                    />
                )}
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    required
                    type="email"
                />
                <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    required
                    type="password"
                />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
                variant="contained"
                sx={{ bgcolor: '#c17912', '&:hover': { bgcolor: '#a66910' } }}
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </Button>
        </DialogActions>
    </Dialog>
);

export default AuthDialog;