import type{ Request, Response } from 'express';
import { ShopService } from '../services/shopService.js';
import type { ShopQuery } from '../schemas/shopSchema.js';

export const ShopController = {
  async getAll(req: Request, res: Response) {
    try {
      const validatedData = res.locals.validated;
      
      const shops = await ShopService.getShops(validatedData.query);
      
      res.json(shops);
    } catch (error) {
      console.error('Error in ShopController.getAll:', error);
      res.status(500).json({ message: 'Error fetching shops', error });
    }
  }
};