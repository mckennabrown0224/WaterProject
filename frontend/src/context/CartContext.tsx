import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  cartTotal: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (projectId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined); //"constructor"

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.projectId === item.projectId);
      const updatedCart = prevCart.map((c) =>
        c.projectId === item.projectId
          ? { ...c, donationAmount: c.donationAmount + item.donationAmount }
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (projectId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.projectId !== projectId)); //filter out everything that is equal to the deleting projectId and reset to the new "prevCart"
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.donationAmount, 0);

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, cartTotal, addToCart, removeFromCart, clearCart }}
    >
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
