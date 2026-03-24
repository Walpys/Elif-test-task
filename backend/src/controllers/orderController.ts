import type{ Request, Response } from 'express';
import { OrderService } from '../services/orderService.js';
import type { CreateOrderDto, OrderHistory } from '../schemas/orderSchema.js';


export const OrderController = {

  async create(req: Request<{}, {}, CreateOrderDto>, res: Response) {
    try {

      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error("FULL ERROR:", error);
      res.status(400).json({ message: 'Error while creating order', error });
    }
  },


  async getHistory(req: Request<{}, {}, {}, OrderHistory>, res: Response) {
    try {
      const history = await OrderService.getHistory(req.query);
      
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Error while retrieving history', error });
    }
  }
};