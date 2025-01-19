"use client"; // Add this line at the top  
  
import React, { createContext, useContext, useState } from 'react';  
  
interface CartItem {  
  id: string;  
  name: string;  
  price: number;  
  quantity: number;  
}  
  
interface CartContextType {  
  cartItems: CartItem[];  
  addToCart: (item: CartItem) => void;  
  removeFromCart: (id: string) => void;  
  getTotal: () => number;  
}  
  
const CartContext = createContext<CartContextType | undefined>(undefined);  
  
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);  
  
  const addToCart = (item: CartItem) => {  
    setCartItems((prev) => {  
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);  
      if (existingItem) {  
        return prev.map((cartItem) =>  
          cartItem.id === item.id  
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }  
            : cartItem  
        );  
      }  
      return [...prev, item];  
    });  
  };  
  
  const removeFromCart = (id: string) => {  
    setCartItems((prev) => prev.filter((item) => item.id !== id));  
  };  
  
  const getTotal = () => {  
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);  
  };  
  
  return (  
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotal }}>  
      {children}  
    </CartContext.Provider>  
  );  
};  
  
export const useCart = () => {  
  const context = useContext(CartContext);  
  if (!context) {  
    throw new Error('useCart must be used within a CartProvider');  
  }  
  return context;  
};  
