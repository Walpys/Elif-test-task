import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const prisma = new PrismaClient();

async function main() {
  // Очищення бази перед сідом
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();

  console.log('🌱 Starting seeding...');

  // 1. McDonny (Рейтинг 4.8) - Багато бургерів для тесту скролу
  await prisma.shop.create({
    data: {
      name: 'McDonny',
      address: 'Central St. 1',
      rating: 4.8,
      products: {
        create: [
          ...Array.from({ length: 20 }).map((_, i) => ({
            name: `Big Burger v${i + 1}`,
            price: 120.5 + i,
            category: 'Burgers',
            imageUrl: 'https://thumbs.dreamstime.com/b/product-icon-symbol-creative-sign-quality-control-icons-collection-filled-flat-computer-mobile-illustration-logo-150923733.jpg'
          })),
          ...Array.from({ length: 15 }).map((_, i) => ({
            name: `French Fries Extra ${i + 1}`,
            price: 45.0 + i,
            category: 'Sides',
            imageUrl: 'https://thumbs.dreamstime.com/b/product-icon-symbol-creative-sign-quality-control-icons-collection-filled-flat-computer-mobile-illustration-logo-150923733.jpg'
          }))
        ]
      }
    }
  });

  // 2. CFK (Рейтинг 3.5) - Курка та Снеки
  await prisma.shop.create({
    data: {
      name: 'CFK',
      address: 'Chicken Ave. 5',
      rating: 3.5,
      products: {
        create: [
          ...Array.from({ length: 12 }).map((_, i) => ({
            name: `Chicken Bucket XL ${i + 1}`,
            price: 250.0 + i * 5,
            category: 'Chicken',
            imageUrl: 'https://thumbs.dreamstime.com/b/product-icon-symbol-creative-sign-quality-control-icons-collection-filled-flat-computer-mobile-illustration-logo-150923733.jpg'
          })),
          ...Array.from({ length: 10 }).map((_, i) => ({
            name: `Hot Wings Hotter ${i + 1}`,
            price: 85.0 + i,
            category: 'Snacks',
            imageUrl: 'https://thumbs.dreamstime.com/b/product-icon-symbol-creative-sign-quality-control-icons-collection-filled-flat-computer-mobile-illustration-logo-150923733.jpg'
          }))
        ]
      }
    }
  });

  // 3. Burger Queen (Рейтинг 4.2) - Для тесту фільтрації за рейтингом
  await prisma.shop.create({
    data: {
      name: 'Burger Queen',
      address: 'Royal Road 7',
      rating: 4.2,
      products: {
        create: [
          { name: 'Royal Cheese', price: 150.0, category: 'Burgers' },
          { name: 'Queen Fries', price: 55.0, category: 'Sides' },
        ]
      }
    }
  });

  // 4. Healthy Food (Рейтинг 2.8) - Низький рейтинг для фільтра 2.0-3.0
  await prisma.shop.create({
    data: {
      name: 'Salad Bar',
      address: 'Green Park 12',
      rating: 2.8,
      products: {
        create: [
          { name: 'Ceaser Salad', price: 180.0, category: 'Snacks' },
          { name: 'Mineral Water', price: 30.0, category: 'Sides' },
        ]
      }
    }
  });

  console.log('✅ Seed finished successfully! Added 4 shops and ~60 products.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });