import { prisma } from '../lib/prisma.js';
import { ProductMapper } from '../mappers/productMapper.js';
import type { ProductQuery } from '../Common/ProductQuery.js';
import type { ProductResponseDto } from '../dtos/productDto.js';
import { Prisma } from '@prisma/client';

export const ProductService = {
  async getAllProducts(): Promise<ProductResponseDto[]> {
    const products = await prisma.product.findMany();
    return products.map(ProductMapper.toDto);
  },

async getByShop(params: ProductQuery) {
    const { 
      shopId, 
      category, 
      cursor, 
      limit = 10, 
      sortBy = 'name', 
      order = 'asc' 
    } = params;

    const where: Prisma.ProductWhereInput = { shopId };
    if (category?.trim()) {
      where.category = { equals: category, mode: 'insensitive' };
    }

    const queryArgs: Prisma.ProductFindManyArgs = {
      where,
      take: Number(limit),
      orderBy: { 
        [sortBy]: order 
      } as Prisma.ProductOrderByWithRelationInput,
    };


    if (cursor) {
      queryArgs.cursor = { id: cursor };
      queryArgs.skip = 1;
    }

    const [items, totalCount] = await Promise.all([
      prisma.product.findMany(queryArgs),
      prisma.product.count({ where })
    ]);

    const lastItem = items[items.length - 1];
    
    return {
      items: items.map(ProductMapper.toDto),
      nextCursor: lastItem?.id || null,
      totalCount,
    };
  },

  async getCategoriesByShop(shopId: string): Promise<string[]> {
  const products = await prisma.product.findMany({
    where: { shopId },
    select: { category: true },
    distinct: ['category'],
  });
  
  return products
    .map(p => p.category)
    .filter((category): category is string => !!category);
}
};