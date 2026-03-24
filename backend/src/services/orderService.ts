import { prisma } from '../lib/prisma.js';
import { OrderMapper } from '../mappers/orderMapper.js';
import type { CreateOrderDto, OrderHistory, OrderHistoryResponse } from '../schemas/orderSchema.js';
import type { Prisma } from '@prisma/client'; 
import type { OrderWithItemsAndProducts } from '../types/order.js';

export const OrderService = {
  async createOrder(dto: CreateOrderDto) {

    const productIds = dto.items.map(i => i.productId);

    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    let calculatedTotalPrice = 0;
    const itemsWithPrices = dto.items.map(item => {
      const product = dbProducts.find(p => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      
      const itemTotal = Number(product.price) * item.quantity;
      calculatedTotalPrice += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price 
      };
    });


    const order = await prisma.order.create({
      data: {
        userName: dto.userName,
        userEmail: dto.userEmail,
        userPhone: dto.userPhone,
        userAddress: dto.userAddress,
        totalPrice: calculatedTotalPrice,
        items: {
          create: itemsWithPrices
        }
      },
      include: { items: true }
    });

    return OrderMapper.toDto(order);
  },


  async getHistory(query: OrderHistory) {
  const { email, phone } = query;
  const filters: Prisma.OrderWhereInput[] = [];
  if (email) filters.push({ userEmail: email });
  if (phone) filters.push({ userPhone: phone });

  const orders = await prisma.order.findMany({
    where: filters.length > 0 ? { OR: filters } : {},
    include: { 
      items: {
        include: { 
          product: true 
        } 
      } 
    },
    orderBy: { createdAt: 'desc' }
  });

  return orders.map(order => OrderMapper.toHistoryDto(order as OrderWithItemsAndProducts));
}
};