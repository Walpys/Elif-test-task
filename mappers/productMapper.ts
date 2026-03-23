import { type Product, Prisma } from '@prisma/client';
import type { CreateProductDto, ProductResponseDto } from '../src/dtos/productDto.js';


export const ProductMapper = {
  toDto(model: Product): ProductResponseDto {
    return {
      id: model.id,
      shopId: model.shopId,
      name: model.name,
      price: model.price.toNumber(),
      imageUrl: model.imageUrl ?? '',
      category: model.category ?? '',
      createdAt: (model as any).createdAt 
    };
  },

  toPrismaCreate(dto: CreateProductDto): Prisma.ProductCreateInput {
    return {
      name: dto.name,
      price: dto.price,
      imageUrl: dto.imageUrl ?? '',
      category: dto.category ?? '',
      shop: { connect: { id: dto.shopId } }
    };
  }
};