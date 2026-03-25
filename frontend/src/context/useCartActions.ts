import type{ ProductDetails } from '../types/product';
import type{ CartItem } from '../types/cart';

export const useCartActions = (
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
) => {
  
  const addToCart = (product: ProductDetails) => {
    setCart((prev) => {
      if (prev.length > 0 && prev[0].shopId !== product.shopId) {
        if (!window.confirm("Очистити кошик для нового магазину?")) return prev;
        return [{ ...product, quantity: 1 }];
      }

      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item))
          .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  return { addToCart, removeFromCart, updateQuantity, clearCart };
};