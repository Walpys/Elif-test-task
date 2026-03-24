
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ShopPage } from './pages/shopPage/shopPage';
import { Layout } from './components/layout/layout';


const CartPage = () => <div style={{ padding: '2rem' }}>🛒 Shopping Cart Page</div>;
const HistoryPage = () => <div style={{ padding: '2rem' }}>📜 Order History Page</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        index: true, 
        element: <ShopPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);