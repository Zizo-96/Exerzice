import { Box, Typography, Paper } from "@mui/material";
import { jwtDecode } from 'jwt-decode';

function Profile() {
    let token;
    let decoded;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
        decoded = jwtDecode(token);
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                padding: 3
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    maxWidth: 600,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant='h4'
                    component='h1'
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}
                    gutterBottom
                >
                    Welcome back, {decoded ? decoded.username : 'Guest'}!
                </Typography>
                <Typography
                    variant='body1'
                    sx={{
                        color: '#grey'
                    }}
                >
                    Unleash Your Inner Warrior.
                </Typography>
            </Paper>
        </Box>
    );
}

export default Profile;