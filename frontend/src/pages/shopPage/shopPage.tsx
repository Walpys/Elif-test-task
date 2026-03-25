import { useEffect, useState, useRef, useMemo } from 'react';
import styles from './shopPage.module.css';
import type { ShortShop } from '../../types/shop';
import { shopApi } from '../../api/shopApi';
import { productApi } from '../../api/productApi';
import { ProductCard } from '../../components/productCard/productCard';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Button } from '../../components/UI/button/Button';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { MobileDrawer } from '../../components/mobileDrawer/mobileDrawer';

const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export const ShopPage = () => {
  const isMobile = useIsMobile(); 
  const { cart, addToCart } = useCart();
  
  const [allShops, setAllShops] = useState<ShortShop[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{sortBy: string, order: 'asc' | 'desc'}>({ 
    sortBy: 'name', order: 'asc' 
  });

  const { products, loading, isFetchingNextPage, nextCursor, loadMore } = useProducts({
    shopId: selectedShopId,
    category: selectedCategory,
    sortConfig
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    shopApi.getAll().then(data => {
      setAllShops(data);
      if (data.length > 0) setSelectedShopId(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedShopId) {
      productApi.getCategories(selectedShopId).then(setAvailableCategories);
      setSelectedCategory(null);
    }
  }, [selectedShopId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextCursor && !isFetchingNextPage) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [nextCursor, isFetchingNextPage, loadMore]);

  const filteredShops = useMemo(() => 
    allShops.filter(shop => !minRating || (shop.rating >= minRating && shop.rating < minRating + 1)),
    [allShops, minRating]
  );

  return (
    <div className={styles.container}>
      {!isMobile && (
        <aside className={styles.desktopSidebar}>
          <Sidebar 
            shops={filteredShops} 
            selectedShopId={selectedShopId} 
            onSelectShop={setSelectedShopId} 
            onRatingFilterChange={setMinRating} 
          />
        </aside>
      )}

      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        title="Shops & Filters"
      >
        <Sidebar 
          shops={filteredShops} 
          selectedShopId={selectedShopId} 
          onSelectShop={(id) => {
            setSelectedShopId(id);
            setIsDrawerOpen(false);
          }} 
          onRatingFilterChange={setMinRating} 
        />
      </MobileDrawer>

      <div className={styles.content}>
        <header className={styles.toolbar}>
          {isMobile && (
            <Button 
              variant="primary" 
              className={styles.menuBtn} 
              onClick={() => setIsDrawerOpen(true)}
            >
              🍔 Filters & Shops
            </Button>
          )}

          <div className={styles.categories}>
            {availableCategories.map(cat => (
              <Button 
                key={cat} 
                variant={selectedCategory === cat ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(prev => prev === cat ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <select 
            className={styles.sortSelect} 
            onChange={(e) => {
              const [sortBy, order] = e.target.value.split('-');
              setSortConfig({ sortBy, order: order as 'asc' | 'desc' });
            }}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
          </select>
        </header>

        <main className={styles.productsGrid}>
          {loading ? (
            <div className={styles.loader}>🍔 Loading delicious food...</div>
          ) : (
            <>
              {products.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onAddToCart={addToCart} 
                  isAdded={cart.some(item => item.id === p.id)} 
                />
              ))}
              <div ref={observerTarget} className={styles.sentinel}>
                {isFetchingNextPage && <p>🍟 Loading more...</p>}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};