import { createContext, useState, useEffect, type ReactNode, useMemo } from 'react';
import type{ CartItem, CartContextType } from '../types/cart';
import { useCartActions } from './useCartActions';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('delivery-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('delivery-cart', JSON.stringify(cart));
  }, [cart]);

  const actions = useCartActions(setCart);
  const stats = useMemo(() => ({
    totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
  }), [cart]);

  const value = {
    cart,
    ...actions,
    ...stats
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};