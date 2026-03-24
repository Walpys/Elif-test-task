import { useEffect, useState } from 'react';
import styles from './ShopPage.module.css';
import type { ShortShop } from '../../types/shop';
import type { ProductDetails } from '../../types/product';
import { shopApi } from '../../api/shopApi';
import { productApi } from '../../api/productApi';
import { ProductCard } from '../../components/productCard/productCard';
import { Sidebar } from '../../components/sidebar/sidebar';
import { useCart } from '../../hooks/useCart';

export const ShopPage = () => {
  const [shops, setShops] = useState<ShortShop[]>([]);
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    shopApi.getAll().then((data) => {
      setShops(data);
      if (data.length > 0) setSelectedShopId(data[0].id);
    });
  }, []);


  useEffect(() => {
    if (selectedShopId) {
      setLoading(true);
      productApi.getByShop(selectedShopId)
        .then((data) => setProducts(data.items))
        .finally(() => setLoading(false));
    }
  }, [selectedShopId]);

  const handleAddToCart = (product: ProductDetails) => {
    addToCart(product);
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        shops={shops} 
        selectedShopId={selectedShopId} 
        onSelectShop={setSelectedShopId} 
      />
      
      <main className={styles.productsGrid}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map(product => {
            // Перевіряємо чи товар вже додано
            const isItemInCart = cart.some(item => item.id === product.id);

            return (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                isAdded={isItemInCart} // Передаємо новий пропс
              />
            );
          })
        )}
      </main>
    </div>
  );
};