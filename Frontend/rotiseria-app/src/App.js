import React, { useState } from 'react';
import './App.css';
import Header from './componentes/Header';
import Menu from './componentes/Menu';
import Cart from './componentes/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Menu onAddToCart={addToCart} />
        <Cart items={cartItems} onRemove={removeFromCart} />
      </div>
    </div>
  );
}

export default App;
