// Footer.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, bgcolor: 'primary.main' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'white', mr: 2 }}>
            Exerzice © 2024
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Created by Abdelaziz Mohamed
          </Typography>
        </Box>
        <Box>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/abdelaziz-mohamed-571997124/"
            target="_blank"
            sx={{ color: 'white' }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/Zizo-96"
            target="_blank"
            sx={{ color: 'white' }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
