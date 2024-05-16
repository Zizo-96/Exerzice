import { Box,Typography } from '@mui/material';
// import landingPage from '../assets/landingPage.png'
import landingPage3 from '../assets/landingPage3.jpg'
// import MainImage from '../assets/MainImage.jpg'


function Home() {
  return (    
      <Box
        sx={{
        backgroundImage: `url(${landingPage3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '100vh',
          margin: 0,
        }}
        >
      <Typography variant="h1" sx={{ color: 'white' }} style={{ fontFamily: 'Montserrat' }}>
        Strong is Beautiful.
      </Typography>
      <Typography variant="h1" sx={{ color: 'white' }} style={{ fontFamily: 'Montserrat' }}>
        Strong is You.
      </Typography>
      </Box>);
}

export default Home;