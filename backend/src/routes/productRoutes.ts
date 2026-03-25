import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
import { ProductQuerySchema } from '../schemas/productSchema.js';
import { IdParamSchema } from '../schemas/common.js';
import { validate } from '../middlware/validate.js';

const productRoutes = Router();


productRoutes.get('/', validate(ProductQuerySchema), ProductController.getByShop);

productRoutes.get('/categories/:id', validate(IdParamSchema), ProductController.getCategories);

export default productRoutes;