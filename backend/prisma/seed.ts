import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();

  const mcDonny = await prisma.shop.create({
    data: {
      name: 'McDonny',
      address: 'Central St. 1',
      rating: 4.8, 
      products: {
        create: [
          { name: 'Big Burger', price: 120.50, category: 'Burgers' },
          { name: 'French Fries', price: 45.00, category: 'Sides' },
        ]
      }
    }
  });

  const cfk = await prisma.shop.create({
    data: {
      name: 'CFK',
      address: 'Chicken Ave. 5',
      rating: 3.5, 
      products: {
        create: [
          { name: 'Chicken Bucket', price: 250.00, category: 'Chicken' },
          { name: 'Hot Wings', price: 85.00, category: 'Snacks' },
        ]
      }
    }
  });

  console.log('✅ Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });