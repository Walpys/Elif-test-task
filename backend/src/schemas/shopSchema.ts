import { z } from 'zod';

export const CreateShopSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Shop name is too short"),
    address: z.string().min(5, "Address is too short"),
    rating: z.number().min(1).max(5).optional().default(1),
  })
});

export type CreateShopDto = z.infer<typeof CreateShopSchema>['body'];


export interface ShopResponseDto {
  id: string;
  name: string;
  address: string;
  rating: number;
}

export const ShopQuerySchema = z.object({
  query: z.object({
    minRating: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(1).max(5).optional()),
    maxRating: z.preprocess((val) => (val ? Number(val) : undefined), z.number().min(1).max(5).optional()),
  }).refine(data => {
    if (data.minRating && data.maxRating) {
      return data.minRating <= data.maxRating;
    }
    return true;
  }, {
    message: "minRating cannot be greater than maxRating",
    path: ["minRating"]
  })
});

export type ShopQuery = z.infer<typeof ShopQuerySchema>['query'];