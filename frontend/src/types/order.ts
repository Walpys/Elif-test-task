export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrder {
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  items: OrderItem[];
}
export interface OrderResponse extends CreateOrder {
  id: string;
  createdAt: string;
}