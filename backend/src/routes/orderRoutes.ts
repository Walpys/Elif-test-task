import { Router } from 'express';
import { OrderController } from '../controllers/orderController.js';
import { validate } from '../middlware/validate.js'; 
import { CreateOrderSchema, OrderHistorySchema } from '../schemas/orderSchema.js';

const orderRoutes = Router();

orderRoutes.post('/', validate(CreateOrderSchema), OrderController.create);
orderRoutes.get('/history', validate(OrderHistorySchema), OrderController.getHistory);

export default orderRoutes;