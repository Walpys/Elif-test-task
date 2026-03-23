import { type Shop, Prisma } from '@prisma/client';
import type { CreateShopDto, ShopResponseDto } from '../src/dtos/shopDto.js';

export const ShopMapper = {
  toDto(model: Shop): ShopResponseDto {
    return {
      id: model.id,
      name: model.name,
      address: model.address ?? '', 
    };
  },

  toPrismaCreate(dto: CreateShopDto): Prisma.ShopCreateInput {
    return {
      name: dto.name,
      address: dto.address, 
    };
  }
};