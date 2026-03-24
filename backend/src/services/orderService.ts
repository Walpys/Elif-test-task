import type { OrderHistoryQuery } from '../Common/OrderHistoryParameters.js';
import type { CreateOrderDto } from '../dtos/orderDto.js';
import { prisma } from '../lib/prisma.js';
import { OrderMapper } from '../mappers/orderMapper.js';

export const OrderService = {
  async createOrder(dto: CreateOrderDto) {
    const data = OrderMapper.toPrismaCreate(dto);

    return await prisma.order.create({
      data,
      include: {
        items: true 
      }
    });
  },
  async getHistory(query: OrderHistoryQuery) {
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { userEmail: query.email },
        { userPhone: query.phone }
      ]
    },
    include: {
      items: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return orders.map(order => OrderMapper.toDto(order));
  }
};
