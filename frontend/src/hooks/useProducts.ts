import { useState, useEffect, useCallback } from 'react';
import { productApi } from '../api/productApi';
import type { ProductDetails } from '../types/product';

interface UseProductsProps {
  shopId: string | null;
  category: string | null;
  sortConfig: { sortBy: string; order: 'asc' | 'desc' };
}

export const useProducts = ({ shopId, category, sortConfig }: UseProductsProps) => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  useEffect(() => {
    if (!shopId) return;

    setLoading(true);
    productApi.getByShop({
      shopId,
      sortBy: sortConfig.sortBy,
      order: sortConfig.order,
      category: category || undefined,
      limit: 10
    })
    .then((data) => {
      setProducts(data.items);
      setNextCursor(data.nextCursor);
    })
    .finally(() => setLoading(false));
  }, [shopId, category, sortConfig]);

  const loadMore = useCallback(async () => {
    if (!shopId || !nextCursor || isFetchingNextPage) return;

    setIsFetchingNextPage(true);
    try {
      const data = await productApi.getByShop({
        shopId,
        cursor: nextCursor,
        sortBy: sortConfig.sortBy,
        order: sortConfig.order,
        category: category || undefined,
        limit: 10
      });

      setProducts(prev => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
    } finally {
      setIsFetchingNextPage(false);
    }
  }, [shopId, nextCursor, isFetchingNextPage, sortConfig, category]);

  return { products, loading, isFetchingNextPage, nextCursor, loadMore };
};