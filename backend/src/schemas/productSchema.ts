import { z } from 'zod';
import { IdSchema } from './common.js';
import type { ParsedQs } from 'qs';

export const ProductQuerySchema = z.object({
  query: z.object({
    shopId: IdSchema,
    category: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.preprocess((val) => (val ? Number(val) : undefined), z.number().positive().optional().default(10)),
    sortBy: z.enum(['price', 'name']).optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
  })
});

export const CreateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    price: z.number().positive(),
    imageUrl: z.string().url().optional(),
    category: z.string().optional(),
    shopId: IdSchema
  })
});

export type ProductQuery = z.infer<typeof ProductQuerySchema>['query'] & ParsedQs;
export type CreateProductDto = z.infer<typeof CreateProductSchema>['body'];

export interface ProductResponseDto {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string | null;
  shopId: string;
}