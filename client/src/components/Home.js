import { Box,Typography } from '@mui/material';
// import landingPage from '../assets/landingPage.png'
import landingPage3 from '../assets/landingPage3.jpg'


function Home() {
  return (    
      <Box
        sx={{
          backgroundImage: `url(${landingPage3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '100vh',
          width: '100vw',
          margin: 0,
          backdropFilter: 'blur(50px)'
        }}
        >
      <Typography variant="h1" sx={{ color: 'white'}}>
        Train Like a Champion,
      </Typography>
      <Typography variant="h1" sx={{ color: 'white' }}>
        Live Like a Legend
      </Typography>
      </Box>);
}

export default Home;