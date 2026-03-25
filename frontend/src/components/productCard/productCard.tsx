import styles from './ProductCard.module.css';
import type { ProductDetails } from '../../types/product'; 
import { Button } from '../UI/button/Button';

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
        <img 
          src={product.imageUrl || DEFAULT_IMAGE} 
          alt={product.name} 
          className={styles.image} 
        />
      </div>
      <div className={styles.info}>
        <h4 className={styles.name}>{product.name}</h4>
        <div className={styles.footer}>
          <p className={styles.price}>{product.price} ₴</p>
          <Button 
            variant={isAdded ? 'secondary' : 'primary'} 
            disabled={isAdded}
            onClick={() => onAddToCart(product)}
            className={styles.cardButton}
          >
            {isAdded ? 'In Cart' : 'add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};