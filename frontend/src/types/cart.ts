import type{ ProductDetails } from './product';

export interface CartItem extends ProductDetails {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductDetails) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}