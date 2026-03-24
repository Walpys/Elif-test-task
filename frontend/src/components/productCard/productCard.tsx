import styles from './ProductCard.module.css';
import type { ProductDetails } from '../../types/product'; 

interface ProductCardProps {
  product: ProductDetails;
  onAddToCart: (product: ProductDetails) => void;
  isAdded: boolean;
}
const DEFAULT_IMAGE = 'https://thumbs.dreamstime.com/b/product-icon-symbol-creative-sign-quality-control-icons-collection-filled-flat-computer-mobile-illustration-logo-150923733.jpg';
export const ProductCard = ({ product, onAddToCart, isAdded }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.imageUrl || DEFAULT_IMAGE} alt={product.name} />
      </div>
      <div className={styles.info}>
        <h4 className={styles.name}>{product.name}</h4>
        <p className={styles.price}>{product.price} ₴</p>
        <button 
        className={`${styles.addButton} ${isAdded ? styles.added : ''}`} 
        onClick={() => !isAdded && onAddToCart(product)} 
        disabled={isAdded}
      >
        {isAdded ? 'In Cart' : 'add to Cart'}
      </button>
      </div>
    </div>
  );
};