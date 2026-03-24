import { Router } from 'express';
import { ShopController } from '../controllers/shopController.js';
import { ProductController } from '../controllers/productController.js';
import { OrderController } from '../controllers/orderController.js';


const router = Router();

router.get('/shops', ShopController.getAll);

router.get('/products', ProductController.getAll);

router.post('/orders', OrderController.create);

export default router;