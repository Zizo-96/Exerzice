import { Box, Typography } from '@mui/material';
import landingPage3 from '../assets/landingPage3.jpg';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

function Home() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${landingPage3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: { xs: '20px', sm: '25px', md: '30px' },
      }}
    >
      <Box sx={{ mt: { xs: '10px', sm: '20px', md: '30px' } }}>
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontFamily: 'Montserrat',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem', lg: '4rem' },
          }}
        >
          Strong is Beautiful,
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontFamily: 'Montserrat',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem', lg: '4rem' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Strong is You
          <FavoriteTwoToneIcon
            color="primary"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem', lg: '4rem' },
              ml: 1,
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
