import React, { useEffect } from 'react';
import '../estilos/Menu.css';
import { useProducts } from '../datos/useApi';
import { handleApiError } from '../datos/api';

function Menu({ onAddToCart }) {
  const { products, loading, error, fetchProducts } = useProducts();

  // Cargar productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="menu">
        <h2>Nuestro Menú</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si ocurre
  if (error) {
    return (
      <div className="menu">
        <h2>Nuestro Menú</h2>
        <div className="error-container">
          <p className="error-message">
            {handleApiError(error)}
          </p>
          <button 
            className="retry-button"
            onClick={() => fetchProducts()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Mostrar mensaje si no hay productos
  if (!products || products.length === 0) {
    return (
      <div className="menu">
        <h2>Nuestro Menú</h2>
        <div className="empty-container">
          <p>No hay productos disponibles en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu">
      <h2>Nuestro Menú</h2>
      <div className="menu-grid">
        {products.map((item, index) => (
          <div key={item.id || index} className="menu-item">
            <img 
              src={item.imageUrl || item.image || `https://via.placeholder.com/200x150?text=${encodeURIComponent(item.name)}`} 
              alt={item.name}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/200x150?text=${encodeURIComponent(item.name)}`;
              }}
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">${item.price?.toFixed(2) || '0.00'}</p>
            <button 
              className="add-button"
              onClick={() => onAddToCart(item)}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
