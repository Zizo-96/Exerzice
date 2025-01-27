import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {useNavigate} from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ severity: '', message: '' });
  let token;
  let decoded;
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let user = { email, password };
      let res = await axios.post('http://localhost:8080/users/logIn', user);
      // The following line is to work with the repository on Codespaces.
      // let res = await axios.post('https://cuddly-memory-jj56px57x475f5vwg-8000.app.github.dev/users/logIn', user);
      console.log(res.data.message);
      if (res.data.message === "LogIn successfully") {
        // Storing the token in local storage only if login is successful
        token = res.data.token;
        localStorage.setItem('token', token);
        decoded = jwtDecode(token);
        navigate("/");
      } else {
        setAlert({ severity: 'error', message: res.data.message });
      }
    } catch (error) {
      console.log(error);
      setPassword("");
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signUp" variant="body2" sx={{bgcolor: "white"}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
  {alert.message && (
    <Alert severity={alert.severity} onClose={() => setAlert({ severity: '', message: '' })}>
      <AlertTitle>{alert.severity.toUpperCase()}</AlertTitle>
      {alert.message}
    </Alert>
  )}
</Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
  );
}