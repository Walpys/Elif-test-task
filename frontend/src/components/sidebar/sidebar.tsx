import { useState } from 'react';
import styles from './Sidebar.module.css';
import type { ShortShop } from '../../types/shop';
import { Star } from 'lucide-react'; 

interface SidebarProps {
  shops: ShortShop[];
  selectedShopId: string | null;
  onSelectShop: (id: string) => void;
  onRatingFilterChange: (min: number | null) => void; 
}

export const Sidebar = ({ 
  shops, 
  selectedShopId, 
  onSelectShop, 
  onRatingFilterChange 
}: SidebarProps) => {
  const [activeRating, setActiveRating] = useState<number | null>(null);

  const ratingFilters = [
    { label: '4.0 - 5.0', min: 4.0 },
    { label: '3.0 - 4.0', min: 3.0 },
    { label: '2.0 - 3.0', min: 2.0 },
  ];

  const handleRatingClick = (min: number) => {
    const newValue = activeRating === min ? null : min;
    setActiveRating(newValue);
    onRatingFilterChange(newValue);
  };

  return (
    <aside className={styles.sidebar}>
      <section className={styles.section}>
        <h3 className={styles.title}>Filter by Rating:</h3>
        <div className={styles.ratingList}>
          {ratingFilters.map((filter) => (
            <button
              key={filter.min}
              className={`${styles.ratingButton} ${activeRating === filter.min ? styles.activeRating : ''}`}
              onClick={() => handleRatingClick(filter.min)}
            >
              <Star size={14} fill={activeRating === filter.min ? "currentColor" : "none"} />
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.title}>Shops:</h3>
        <div className={styles.list}>
          {shops.length > 0 ? (
            shops.map((shop) => (
              <button
                key={shop.id}
                className={`${styles.shopButton} ${selectedShopId === shop.id ? styles.active : ''}`}
                onClick={() => onSelectShop(shop.id)}
              >
                <span className={styles.shopName}>{shop.name}</span>
                {shop.rating && <span className={styles.shopRating}>{shop.rating} ⭐</span>}
              </button>
            ))
          ) : (
            <p className={styles.empty}>No shops found</p>
          )}
        </div>
      </section>
    </aside>
  );
};