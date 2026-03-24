import { Prisma, type Order } from '@prisma/client';
import {type CreateOrderDto, type OrderResponseDto } from '../dtos/orderDto.js'; 

type OrderFromDb = Prisma.OrderGetPayload<{
  include: { items: true }
}>;
export const OrderMapper = {
  toPrismaCreate(dto: CreateOrderDto): Prisma.OrderCreateInput {
    const { items, ...orderData } = dto;

    return {
      ...orderData, 
      items: {
        create: items.map(item => ({
          quantity: item.quantity,
          price: item.price,
          productId: item.productId 
        }))
      }
    };
  },
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
  }
};