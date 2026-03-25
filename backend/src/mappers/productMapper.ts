import { type Product, Prisma } from '@prisma/client';
import type { CreateProductDto, ProductResponseDto } from '../schemas/productSchema.js';

const DEFAULT_PRODUCT_IMAGE = 'https://thumbs.dreamstime.com/b/product-icon-symbol-creative-sign-quality-control-icons-collection-filled-flat-computer-mobile-illustration-logo-150923733.jpg';
export const ProductMapper = {
  toDto(model: Product): ProductResponseDto {
    return {
      id: model.id,
      shopId: model.shopId,
      name: model.name,
      price: model.price.toNumber(),
      imageUrl: model.imageUrl ?? DEFAULT_PRODUCT_IMAGE,
      category: model.category ?? 'general',
    };
  },

  toPrismaCreate(dto: CreateProductDto): Prisma.ProductCreateInput {
    return {
      name: dto.name,
      price: dto.price,
      imageUrl: dto.imageUrl ?? DEFAULT_PRODUCT_IMAGE,
      category: dto.category ?? 'general',
      shop: { connect: { id: dto.shopId } }
    };
  }
};