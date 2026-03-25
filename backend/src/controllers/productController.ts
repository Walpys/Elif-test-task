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

  async getCategories(req: Request, res: Response) {
    try {
      const { id } = req.params; 
    
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing Shop ID' });
      }
      const categories = await ProductService.getCategoriesByShop(id);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error while retrieving categories', error });
    } 
  }
};