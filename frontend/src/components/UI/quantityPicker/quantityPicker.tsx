import { Plus, Minus } from 'lucide-react'; 
import styles from './QuantityPicker.module.css';

interface QuantityPickerProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
}

export const QuantityPicker = ({ value, min = 1, max = 99, onChange }: QuantityPickerProps) => {
  
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button 
        type="button" 
        className={styles.btn} 
        onClick={handleDecrement}
        disabled={value <= min} 
      >
        <Minus size={16} />
      </button>
      
      <span className={styles.value}>{value}</span>
      
      <button 
        type="button" 
        className={styles.btn} 
        onClick={handleIncrement}
        disabled={value >= max}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};