// Store.js
import React, { useContext } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import Tshirt from '../assets/Tshirt.jpeg';
import { CartContext } from './CartContext';

function Store() {
  const { addToCart } = useContext(CartContext);

  const handleAddToCartClick = () => {
    const item = {
      description: 'Workout T-shirt, High quality.',
      price: 14.99,
      image: Tshirt,
    };
    addToCart(item);
  };

  return (
    <Box m={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Card sx={{ maxWidth: 300, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
        <CardMedia component="img" alt="T-shirt" image={Tshirt} sx={{ height: 200, objectFit: 'contain' }} />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="body2">Workout T-shirt, High quality.</Typography>
            <Typography variant="body2">€14.99</Typography>
          </Box>
          <IconButton aria-label="Add to cart" sx={{ mt: 0 }} onClick={handleAddToCartClick}>
            <AddShoppingCart />
          </IconButton>
        </CardContent>
      </Card>
      {/* Will add more cards later */}
    </Box>
  );
}

export default Store;
