import { z } from 'zod';
import { IdSchema } from './common.js'; 
export const CreateOrderSchema = z.object({
  body: z.object({
    userName: z.string().min(2),
    userEmail: z.string().email(),
    userPhone: z.string().min(10),
    userAddress: z.string().min(5),
    items: z.array(z.object({
      productId: IdSchema,
      quantity: z.number().int().positive()
    })).min(1)
  })
});
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>['body'];

export const OrderHistorySchema = z.object({
  query: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }).refine(data => data.email || data.phone, {
    message: "Either email or phone must be provided"
  })
});
export type OrderHistory = z.infer<typeof OrderHistorySchema>['query'];

export interface OrderResponseDto extends CreateOrderDto {
  id: string;
  createdAt: Date;
  totalPrice:number
}

export const OrderHistoryResponseSchema = z.object({
  id: z.string().uuid(),

  date: z.coerce.date(), 
  totalPrice: z.number(),
  address: z.string(), 
  items: z.array(z.object({
    productId: z.string().uuid(),
    name: z.string(),   
    image: z.string().url().or(z.string()), 
    quantity: z.number().int().positive(),
    priceAtOrder: z.number()
  }))
});


export type OrderHistoryResponse = z.infer<typeof OrderHistoryResponseSchema>;