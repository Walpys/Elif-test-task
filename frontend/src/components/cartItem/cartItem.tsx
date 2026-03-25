import { Trash2 } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import type{ CartItem as CartItemType } from "../../types/cart"; 
import { Button } from "../UI/button/Button";
import { QuantityPicker } from "../UI/quantityPicker/quantityPicker";
import styles from "./cartItem.module.css";

export const CartItem = ({ item }: { item: CartItemType }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const DEFAULT_IMAGE = 'https://via.placeholder.com/150?text=No+Image';
    const imageSrc = item.imageUrl && item.imageUrl.trim() !== '' 
    ? item.imageUrl 
    : DEFAULT_IMAGE;
  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={item.name} className={styles.image} />
      </div>
      
      <div className={styles.details}>
        <div className={styles.header}>
          <h3 className={styles.name}>{item.name}</h3>
            <Button 
                variant="danger" 
                size="sm" 
                onClick={() => removeFromCart(item.id)}
                title="Remove item"
                >
                <Trash2 size={18} />
                </Button>
        </div>

        <p className={styles.price}>{item.price} ₴</p>
        
        <div className={styles.controls}>
          <QuantityPicker 
            value={item.quantity} 
            onChange={(newQty) => updateQuantity(item.id, newQty)} 
            min={1} 
            max={50} 
          />
          <span className={styles.itemTotal}>
            {(item.price * item.quantity).toFixed(2)} ₴
          </span>
        </div>
      </div>
    </div>
  );
};