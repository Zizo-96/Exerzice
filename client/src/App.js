// import { Box, Paper, Button } from '@mui/material';
import Container from '@mui/material/Container'
// import Typography from '@mui/material/Typography'
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login'
import Home from './components/Home';
import Exercises from './components/Exercises';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">

         <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exercises" element={<Exercises />} />
        </Routes>
      </BrowserRouter>
      <Container sx={{height: "100vh"}}>
      </Container>
    </div>
  );
}

export default App;
