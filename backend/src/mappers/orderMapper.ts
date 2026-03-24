import { Prisma, type Order } from '@prisma/client';
import type { OrderHistoryResponse, OrderResponseDto } from '../schemas/orderSchema.js';
import type { OrderFromDb, OrderWithItemsAndProducts } from '../types/order.js';




export const OrderMapper = {

  toDto(order: OrderFromDb): OrderResponseDto {
    return {
      id: order.id,
      userName: order.userName,
      userEmail: order.userEmail,
      userPhone: order.userPhone,
      userAddress: order.userAddress,
      totalPrice: Number(order.totalPrice), 
      createdAt: order.createdAt,
      items: order.items.map(item => ({
        id: item.productId,
        productId: item.productId,
        quantity: item.quantity,
        price: Number(item.price)
      }))
    };
  },
  toHistoryDto(order: OrderWithItemsAndProducts): OrderHistoryResponse {
  return {
    id: order.id,
    date: order.createdAt,
    totalPrice: Number(order.totalPrice),
    address: order.userAddress,
    items: order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      priceAtOrder: Number(item.price), 
      name: item.product.name , 
      image: item.product.imageUrl || 'https://thumbs.dreamstime.com/b/product-icon-symbol-creative-sign-quality-control-icons-collection-filled-flat-computer-mobile-illustration-logo-150923733.jpg' 
    }))
  };
}

};