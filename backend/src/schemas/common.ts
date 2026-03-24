import { z } from 'zod';


export const IdSchema = z.string().uuid("Invalid ID format"); 

export const IdParamSchema = z.object({
  params: z.object({
    id: IdSchema
  })
});