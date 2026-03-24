import { Prisma } from '@prisma/client';

export type OrderWithItemsAndProducts = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true
      }
    }
  }
}>;
export type OrderFromDb = Prisma.OrderGetPayload<{
  include: { items: true }
}>;