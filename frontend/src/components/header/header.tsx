import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import { ShoppingCart, Store, History } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export const Header = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <nav className={styles.header}>
      <div className={styles.navLinks}>
        <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
          <Store size={20} /> Shop
        </Link>
        <Link to="/cart" className={`${styles.link} ${location.pathname === '/cart' ? styles.active : ''}`}>
          <ShoppingCart size={20} /> 
            Shopping Cart 
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>
        <Link to="/history" className={`${styles.link} ${location.pathname === '/history' ? styles.active : ''}`}>
          <History size={20} /> History
        </Link>
      </div>
    </nav>
  );
};