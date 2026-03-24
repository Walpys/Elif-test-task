import type { Request, Response } from 'express';
import { ProductService } from '../services/productService.js';
import type { ProductQuery } from '../schemas/productSchema.js'; 

export const ProductController = {
  async getByShop(req: Request<{}, {}, {}, ProductQuery>, res: Response) {
    try {
      const query = res.locals?.validated?.query;
      const result = await ProductService.getByShop(query);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getCategories(req: Request<{ shopId: string }>, res: Response) {
    try {
      const { shopId } = req.params;
      const categories = await ProductService.getCategoriesByShop(shopId);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error while retrieving categories', error });
    }
  }
};