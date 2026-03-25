import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './cartPage.module.css';
import { Input } from '../../components/UI/input/Input';
import { CartItem } from '../../components/cartItem/cartItem';
import { Button } from '../../components/UI/button/Button';
import { orderService } from '../../services/orderService';

export const CartPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      await orderService.placeOrder(formData, cart);
      alert('Order created successfully! 🎉');
      clearCart();
      navigate('/'); 
    } catch (err) {
      console.error('Order placement failed:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form id="order-form" className={styles.grid} onSubmit={handleSubmit}>
        <section className={styles.panel}>
          <h2 className={styles.title}>Contact Information</h2>
          <div className={styles.formFields}>
            <Input label="Name" name="name" placeholder="Name Surname" value={formData.name} onChange={handleInputChange} required />
            <Input label="Email" type="email" name="email" placeholder="example@example.com" value={formData.email} onChange={handleInputChange} required />
            <Input label="Phone" type="tel" name="phone" placeholder="+380991234567" value={formData.phone} onChange={handleInputChange} required />
            <Input label="Address" name="address" placeholder="Kyiv, Shevchenka 1" value={formData.address} onChange={handleInputChange} required />
          </div>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.title}>Your Order</h2>
          <div className={styles.itemsList}>
            {cart.length > 0 ? (
              cart.map((item) => <CartItem key={item.id} item={item} />)
            ) : (
              <div className={styles.emptyState}>
                <p>Your cart is empty. Go back to shop! 🍔</p>
              </div>
            )}
          </div>
        </section>
      </form>

      <footer className={styles.footer}>
        <div className={styles.totalBlock}>
          <span className={styles.totalLabel}>Total Price:</span>
          <span className={styles.totalAmount}>{totalPrice.toFixed(2)} ₴</span>
        </div>
        <Button 
          type="submit" 
          form="order-form" 
          variant="primary" 
          size="lg"
          disabled={cart.length === 0 || isSubmitting} 
        >
          {isSubmitting ? 'Sending...' : 'Submit Order'}
        </Button>
      </footer>
    </div>
  );
};