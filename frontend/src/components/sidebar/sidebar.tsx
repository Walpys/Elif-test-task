import styles from './Sidebar.module.css';
import type{ ShortShop } from '../../types/shop';

interface SidebarProps {
  shops: ShortShop[];
  selectedShopId: string | null;
  onSelectShop: (id: string) => void;
}

export const Sidebar = ({ shops, selectedShopId, onSelectShop }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Shops:</h3>
      <div className={styles.list}>
        {shops.map((shop) => (
          <button
            key={shop.id}
            className={`${styles.shopButton} ${selectedShopId === shop.id ? styles.active : ''}`}
            onClick={() => onSelectShop(shop.id)}
          >
            {shop.name}
          </button>
        ))}
      </div>
    </aside>
  );
};