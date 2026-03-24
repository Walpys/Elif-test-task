
import { Prisma } from '@prisma/client';
import type { ShopQuery} from '../schemas/shopSchema.js';
import { prisma } from '../lib/prisma.js';
import { ShopMapper } from '../mappers/shopMapper.js';


export const ShopService = {
  async getShops(query: ShopQuery) {
    const { minRating, maxRating } = query;

    const where: Prisma.ShopWhereInput = {};

    if (minRating !== undefined || maxRating !== undefined) {
      const ratingFilter: Prisma.FloatFilter = {};
      
      if (minRating !== undefined) ratingFilter.gte = minRating;
      if (maxRating !== undefined) ratingFilter.lte = maxRating;
      
      where.rating = ratingFilter;
    }
    const shops = await prisma.shop.findMany({
      where,
      orderBy: { rating: 'desc' },
    });

    return shops.map(ShopMapper.toDto);
  }
};