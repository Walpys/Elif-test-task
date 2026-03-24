import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import { getSwaggerDocument } from './swagger.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shops', shopRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(getSwaggerDocument()));

app.get('/swagger.json', (req, res) => {
  res.json(getSwaggerDocument());
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});