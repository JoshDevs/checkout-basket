import React, { useState } from 'react';
import './App.css';
import BasketButton from '../features/basket/basketButton/BasketButton';
import ProductList from '../features/product/productList/ProductList';
import CheckoutModal from '../features/checkout/checkoutModal/CheckoutModal';

function App() {
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <BasketButton setOpenCheckoutModal={setOpenCheckoutModal} />
        <ProductList />
        <CheckoutModal openCheckoutModal={openCheckoutModal} setOpenCheckoutModal={setOpenCheckoutModal} />
      </header>
    </div>
  );
}

export default App;
