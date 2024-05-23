// Cart.js
import React, { useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button, Divider } from '@mui/material';
import { CartContext } from './CartContext';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.description, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.description, item.quantity - 1);
    }
  };

  const handleRemoveItem = (itemDescription) => {
    removeFromCart(itemDescription);
  };

  const handleProceedToPayment = () => {
    // Handle payment logic here
    console.log('Proceeding to payment');
  };

  if (cart.length === 0) {
    return (
      <Box m={2}>
        <Typography variant="h6">You have no items in your shopping cart.</Typography>
        <Button variant="contained" color="primary" href="/store">
          Please continue shopping.
        </Button>
      </Box>
    );
  }

  return (
    <Box m={2}>
      <Typography variant="h6">Shopping Cart</Typography>
      <List>
        {cart.map((item, index) => (
          <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={item.image} alt={item.description} style={{ width: '50px', marginRight: '16px' }} />
            <ListItemText
              primary={item.description}
              secondary={`Price: €${(item.price * item.quantity).toFixed(2)} (€${item.price} each)`}
              sx={{ flex: '1 1 auto' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => handleDecreaseQuantity(item)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton onClick={() => handleIncreaseQuantity(item)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
            <IconButton onClick={() => handleRemoveItem(item.description)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Total Price: €{totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={handleProceedToPayment}>
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;
