// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Exercises from './components/Exercises';
import Programs from './components/Programs';
import Profile from './components/Profile';
import Store from './components/Store';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <BrowserRouter>
          <Navbar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/store" element={<Store />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
