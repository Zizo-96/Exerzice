import { Box, Paper, Button } from '@mui/material';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
         <Navbar/>
      <Container sx={{height: "100vh"}}>
      </Container>
    </div>
  );
}

export default App;
