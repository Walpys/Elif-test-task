import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { CreateOrderSchema, OrderHistorySchema } from './schemas/orderSchema.js';
import { ProductQuerySchema } from './schemas/productSchema.js';
import { ShopQuerySchema } from './schemas/shopSchema.js';
import { IdParamSchema } from './schemas/common.js';

const registry = new OpenAPIRegistry();


registry.registerPath({
  method: 'get',
  path: '/shops',
  tags: ['Shops'],
  summary: 'Get all shops with rating filter',
  request: { 
    query: ShopQuerySchema.shape.query 
  },
  responses: { 
    200: { description: 'Success' },
    500: { description: 'Error fetching shops' }
  },
});

registry.registerPath({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  summary: 'Get products by shop with limit and sorting',
  request: { 
    query: ProductQuerySchema.shape.query 
  },
  responses: { 
    200: { description: 'Success' },
    500: { description: 'Internal server error' }
  },
});

registry.registerPath({
  method: 'get',
  path: '/products/categories/{shopId}',
  tags: ['Products'],
  summary: 'Get categories by shop ID',
  request: { 
    params: IdParamSchema.extend({
      shopId: IdParamSchema.shape.params.shape.id
    }).shape.params 
  },
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  summary: 'Create a new order (Server calculates price)',
  request: {
    body: { 
      content: { 
        'application/json': { 
          schema: CreateOrderSchema.shape.body 
        } 
      } 
    }
  },
  responses: { 
    201: { description: 'Order created' },
    400: { description: 'Invalid input or calculation error' }
  },
});

registry.registerPath({
  method: 'get',
  path: '/orders/history',
  tags: ['Orders'],
  summary: 'Get order history by email or phone',
  request: { 
    query: OrderHistorySchema.shape.query 
  },
  responses: { 
    200: { description: 'Success' },
    500: { description: 'Error while retrieving history' }
  },
});

export const getSwaggerDocument = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: '3.0.0',
    info: { 
      title: 'Elif Tech Delivery API', 
      version: '1.1.0',
      description: 'Typed API with Zod validation and server-side logic'
    },
    servers: [{ url: '/api' }],
  });
};