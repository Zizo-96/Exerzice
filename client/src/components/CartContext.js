import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(itemCount);
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.description === item.description);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.description === item.description
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemDescription) => {
    setCart((prevCart) => prevCart.filter((item) => item.description !== itemDescription));
  };

  const updateQuantity = (itemDescription, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.description === itemDescription ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
