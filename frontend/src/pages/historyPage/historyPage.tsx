import { useState } from 'react';
import { Search, Package, Clock, AlertCircle } from 'lucide-react';
import { orderApi } from '../../api/orderApi';
import { Input } from '../../components/UI/input/Input';
import { Button } from '../../components/UI/button/Button';
import styles from './historyPage.module.css';
import { formatDate } from '../../helpers/dateHelper';

export const HistoryPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Валідація без алертів
    if (!email && !phone) {
      setError('Please enter email or phone to search for your orders.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await orderApi.getHistory(email, phone);
      if (data.length === 0) {
        setError('No orders found with these credentials.');
      }
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch history. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.searchPanel}>
        <h2 className={styles.title}>Search Orders</h2>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.inputs}>
            <Input 
              label="Email" 
              placeholder="example@mail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              label="Phone" 
              placeholder="+380..." 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>

          {/* Вивід помилки замість алерту */}
          {error && (
            <div className={styles.errorBadge}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" variant="primary" disabled={isLoading} className={styles.submitBtn}>
            <Search size={18} />
            {isLoading ? 'Searching...' : 'Find Orders'}
          </Button>
        </form>
      </section>

      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.orderTag}>
                <Package size={18} />
                <span>Order ID: <strong>{order.id.slice(-8).toUpperCase()}</strong></span>
              </div>
              <div className={styles.orderDate}>
                <Clock size={16} />
                <span>{formatDate(order.date)}</span>
              </div>
            </div>

            <div className={styles.itemsGrid}>
              {order.items.map((item: any) => {

                const img = item.image || item.imageUrl;
                
                return (
                  <div key={item.id} className={styles.productMiniCard}>
                    <img src={img} alt={item.name} className={styles.miniImage} />
                    <div className={styles.miniDetails}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemMeta}>{item.quantity} x {item.priceAtOrder || item.price} ₴</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.orderFooter}>
              <div className={styles.priceContainer}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalAmount}>{order.totalPrice.toFixed(2)} ₴</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};