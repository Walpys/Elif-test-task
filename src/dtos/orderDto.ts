export interface OrderItemDto {
  productId: string; 
  quantity: number;
  price: number; 
}

export interface CreateOrderDto {
  userName: string;    
  userEmail: string;   
  userPhone: string;   
  userAddress: string; 
  totalPrice: number;  
  items: OrderItemDto[];
}

export interface OrderResponseDto extends CreateOrderDto {
  id: string;
  createdAt: Date;   
}