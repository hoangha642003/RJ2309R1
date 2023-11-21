import './App.css';
import CartPage from './pages/CartPage';
import FilterPage from './pages/FilterPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<FilterPage />} />
        <Route path='/shoe' element={<FilterPage />} />
        <Route path='/shoe/cart' element={<CartPage />} />
      </Routes>

    </>
  );
}

export default App;
