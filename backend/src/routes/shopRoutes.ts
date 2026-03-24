import { Router } from 'express';
import { ShopController } from '../controllers/shopController.js';
import { ShopQuerySchema, CreateShopSchema } from '../schemas/shopSchema.js';
import { validate } from '../middlware/validate.js';

const shopRoutes = Router();


shopRoutes.get('/', validate(ShopQuerySchema), ShopController.getAll);



export default shopRoutes;