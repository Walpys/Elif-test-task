import { Router } from 'express';
import { OrderController } from '../controllers/orderController.js';
import { validate } from '../middlware/validate.js'; 
import { CreateOrderSchema, OrderHistorySchema } from '../schemas/orderSchema.js';
import { apiKeyMiddleware } from '../middlware/auth.js';

const orderRoutes = Router();
orderRoutes.use(apiKeyMiddleware);
orderRoutes.post('/', validate(CreateOrderSchema), OrderController.create);
orderRoutes.get('/history', validate(OrderHistorySchema), OrderController.getHistory);

export default orderRoutes;