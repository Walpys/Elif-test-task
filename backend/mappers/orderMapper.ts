import { Prisma } from '@prisma/client';
import {type CreateOrderDto } from '../src/dtos/orderDto.js'; 

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
  }
};