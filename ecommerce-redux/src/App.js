import './App.css';
import { Routes, Route } from 'react-router-dom';
import ShoePage from './pages/ShoePage';
import CartPage from './pages/CartPage';
import OrderListPage from './pages/OrderListPage';
import ProductPage from './pages/ProductPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ShoePage />} />
        <Route path='/shoe' element={<ShoePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/dashboard/order-list' element={<OrderListPage/>}/>
        <Route path='/dashboard/product-list' element={<ProductPage/>}/>
      </Routes>
    </>
  );
}

export default App;
