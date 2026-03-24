import { Prisma } from '@prisma/client';

export interface CursorQueryParams {
  limit?: number;
  cursor?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// Створюємо інтерфейс для моделі, де T — це тип даних (напр. Product)
// ми вимагаємо, щоб у об'єкта був обов'язково id: string
interface PrismaModel<T, FindManyArgs> {
  findMany: (args: FindManyArgs) => Promise<T[]>;
  count: (args: { where?: any }) => Promise<number>;
}

export const QueryHelper = {
  async toCursorResult<
    T extends { id: string }, // Гарантуємо, що у елемента є id
    FindManyArgs extends { where?: any; take?: number; skip?: number; cursor?: any; orderBy?: any }
  >(
    model: PrismaModel<T, FindManyArgs>,
    args: FindManyArgs,
    params: CursorQueryParams
  ) {
    const limit = Number(params.limit) || 10;
    const { cursor, sortBy = 'id', order = 'asc' } = params;

    // Створюємо конфіг для запиту з правильним типом
    const findManyArgs = {
      ...args,
      take: limit,
      orderBy: { [sortBy]: order },
    } as FindManyArgs;

    if (cursor) {
      findManyArgs.cursor = { id: cursor };
      findManyArgs.skip = 1;
    }

    const [items, totalCount] = await Promise.all([
      model.findMany(findManyArgs),
      model.count({ where: args.where }),
    ]);

    const lastItem = items.length > 0 ? items[items.length - 1] : null;
    
    // Тепер TS знає, що id існує завдяки T extends { id: string }
    const nextCursor = lastItem ? lastItem.id : null;

    return {
      items,
      totalCount,
      nextCursor,
      hasMore: items.length === limit
    };
  }
};