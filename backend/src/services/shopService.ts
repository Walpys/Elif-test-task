import type { ShopQuery } from '../Common/OrderQueryParameters.js';
import type { ShopResponseDto } from '../dtos/shopDto.js';
import { prisma } from '../lib/prisma.js';
import { ShopMapper } from '../mappers/shopMapper.js';

export const ShopService = {
  async getShops(query: ShopQuery) {
  const { minRating, maxRating } = query;

  const where: any = {};

  if (minRating || maxRating) {
  where.rating = {
    ...(minRating ? { gte: Number(minRating) } : {}),
    ...(maxRating ? { lte: Number(maxRating) } : {}),
  };
}

  const shops = await prisma.shop.findMany({
    where,
    orderBy: { rating: 'desc' },
  });

  return shops.map(shop => ShopMapper.toDto(shop));
}
};