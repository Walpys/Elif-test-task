import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import { CartProvider } from '../../store/cartContext';


export const Layout = () => {
  return (
    <CartProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </CartProvider>
  );
};