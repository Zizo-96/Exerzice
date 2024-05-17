import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const pages = ['Home', 'Exercises', 'Programs', 'Store'];
const settings = ['Profile', 'Dashboard', 'Logout'];
const authes = ['Login', 'Signup'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const navigate = useNavigate();
  let token;
  let decoded;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
    decoded = jwtDecode(token);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    if (setting === "Profile") {
      navigate("/profile");
      handleCloseUserMenu();
    } else if (setting === "Logout") {
      if (token) {
        localStorage.removeItem('token');
      }
      navigate("/");
      handleCloseUserMenu();
    }
  };

  const handlePagesClick = (page) => {
    if (page === "Exercises") {
      navigate("/exercises");
    } else if(page === "Home"){
      navigate("/");
    } else if(page === "Programs"){
      navigate("/programs");
    }
  };

  const handleAuthClick = (auth) => {
    if (auth === "Signup") {
      navigate('/signup'); // Navigate to the signup page
      handleCloseUserMenu();
    }else{
      navigate('/login'); // Navigate to login page
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={logo2} alt="Logo" height="35rem" />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={handleOpenNavMenu}
              edge="start"
              color="inherit"
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' }}}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={() => handlePagesClick(page)}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <img src={logo} alt="Logo" height="30rem" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },alignItems: 'center'}}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => handlePagesClick(page)}
              >
                {page}
              </Button>
            ))}
          </Box>
          <ShoppingCartIcon fontSize="large" sx={{ m: 3 }} />
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* rendering the authentication elements when user isn't logged in */}
              {!token ? (
                authes.map((auth) => (
                  <MenuItem key={auth} >
                    <Typography textAlign="center" onClick={() => handleAuthClick(auth)}>
                      {auth}
                    </Typography>
                  </MenuItem>
                   ))
              ) : (
                settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => handleSettingClick(setting)}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
